// it aint pretty, but it works!

import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import {
  ClassDeclaration,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  Project,
  Scope,
  SourceFile,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

const apiBase = '/api';

const project = new Project({
  tsConfigFilePath: path.join(__dirname, '../server/tsconfig.server.json'),
});

const controllers = {
  ItemController: path.join(__dirname, '../server/api/item/item.controller.ts'),
  EventController: path.join(__dirname, '../server/api/event/event.controller.ts'),
  SuggestedFixController: path.join(__dirname, '../server/api/suggested-fix/suggested-fix.controller.ts'),
  MapLocationController: path.join(__dirname, '../server/api/map-location/map-location.controller.ts'),
};

let sdkMethods = '';
_.forEach(controllers, (controllerPath, className) => {
  const sourceFile: SourceFile = project.addExistingSourceFile(controllerPath);

  const controller: ClassDeclaration = sourceFile.getClassOrThrow(className);

  const controllerBase: string = _.trim(
    (<string[]>_.find(controller.getStructure().decorators, decorator => decorator.name === 'Controller').arguments)[0],
    `'`,
  );

  let controllerMethods = '';

  controller.getStructure().methods.forEach((method: MethodDeclarationStructure) => {
    if (method.scope === Scope.Private || method.scope === Scope.Protected) {
      return;
    }

    const routingDecorator = _.find(method.decorators, decorator =>
      _.includes(['Post', 'Put', 'Get', 'Delete'], decorator.name),
    );
    if (!routingDecorator) {
      return;
    }

    let paramMap: { [paramName: string]: string } = {};
    let bodyParam: string;
    let queryMap: { [paramName: string]: string } = {};
    const paramsArr: string[] = (method.parameters || []).map((param: ParameterDeclarationStructure, index: number) => {
      if (!!_.find(param.decorators, { name: 'LoggedInUser' })) {
        if (index !== method.parameters.length - 1) {
          throw Error(`@LoggedInUser() in ${controller.getStructure().name}#${method.name} must be the last parameter`);
        }

        return;
      }

      (param.decorators || []).forEach(decorator => {
        if (decorator.name === 'Param') {
          paramMap[param.name] = _.trim((<string[]>decorator.arguments)[0], `'`);
        }

        if (decorator.name === 'Body') {
          bodyParam = param.name;
        }

        if (decorator.name === 'Query') {
          queryMap[param.name] = _.trim((<string[]>decorator.arguments)[0], `'`);
        }
      });

      let str = param.isRestParameter ? '...' : '';
      str += paramMap[param.name] || queryMap[param.name] || param.name;
      str += param.hasQuestionToken ? '?' : '';
      str += `: ${param.type}`;

      // console.log(param.decorators);

      return str;
    });

    const params: string = _.compact(paramsArr).join(', ');

    const paramParts = _.compact(
      _.trim((<string[]>routingDecorator.arguments)[0], `'`)
        .split('/')
        .map(p => {
          if (p[0] === ':') {
            return `\${${_.trim(p, `:`)}}`;
          }

          return p;
        }),
    );
    const configParts: string[] = [];
    const httpMethod = routingDecorator.name.toLowerCase();
    const urlParams = paramParts.join('/');
    let url = `${apiBase}/${controllerBase}${urlParams ? '/' + urlParams : ''}`;
    const data = bodyParam ? `, ${bodyParam}` : '';

    let query = _.isEmpty(queryMap) ? '' : _.map(queryMap, (paramName, decoratorName) => `${paramName}`).join(', ');

    query = query ? `params: this.parametize({ ${query} })` : null;

    if (query) {
      configParts.push(query);
    }

    const config = configParts.length > 0 ? `, { ${configParts.join(', ')} }` : '';

    // console.log(method);
    let methodName = method.name;
    if (method.typeParameters && method.typeParameters.length > 0) {
      // TODO needs more
      const generics = _.map(
        method.typeParameters,
        (tp: OptionalKind<TypeParameterDeclarationStructure>) => tp.name,
      ).join(', ');
      methodName += `<${generics}>`;
    }

    let impl = '\n';
    impl += `  ${method.isAsync ? 'async ' : ''}${methodName}(${params}): ${method.returnType} {\n`;
    impl += `    return this.httpClient.${httpMethod}<${(<string>method.returnType).replace(
      /^Promise<(.*?)>$/g,
      '$1',
    )}>(\`${url}\`${data}${config}).toPromise();\n`;
    impl += `  }\n`;

    controllerMethods += impl;
  });

  const parts: string[] = _.kebabCase(className).split('-');
  parts.pop();
  const fileName = parts.join('-');

  const section = `// ${_.startCase(fileName)} //`;
  const slashes = _.repeat('/', section.length);
  sdkMethods += `  ${slashes}\n  ${section}\n  ${slashes}\n${controllerMethods}\n\n`;
});

const entityFiles = fs.readdirSync(path.join(__dirname, '../shared/entities/')).filter(name => !name.match(/future/));
const entityMap = _.fromPairs(
  _.map(entityFiles, p => {
    const base = p.replace(/\.ts$/, '');
    let className = _.camelCase(base);
    _.capitalize(_.camelCase(base));
    className = _.capitalize(className[0]) + className.slice(1);
    return [className, `../../../../shared/entities/${base}`];
  }),
);
const entityImports = _.map(entityMap, (path, name) => `import { ${name} } from '${path}';`).join('\n');

// TODO need better way to import enum (e.g. see SuggestedFixType)

// language=TypeScript
const baseContent =
  entityImports +
  `

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mapValues, omitBy, isNil } from 'lodash';

import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { NumberList } from '../../../../shared/types/number-list';

//////////////////////////////////////////
// This file is generated. Do not edit. //
//////////////////////////////////////////

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  
  // {generatedContent}

  private parametize(paramMap: { [paramName: string]: number | NumberList }): { [paramName: string]: string | string[] } {
    const stringifiedMap = mapValues(paramMap, v => Array.isArray(v) ? v.map(av => av + '') : (v + ''));
    // remove undesirable values
    return omitBy(stringifiedMap, v => isNil(v) || v === 'undefined' || v === 'null' || v === '');
  }
}
`;

const finalContents = baseContent.replace('  // {generatedContent}', _.trimEnd(sdkMethods));

fs.writeFileSync(path.join(__dirname, `../client/app/services/api/api.service.ts`), finalContents, {
  encoding: 'utf8',
});
