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
};

let sdkMethods = '';
_.forEach(controllers, (controllerPath, className) => {
  // const sourceFile: SourceFile = project.addExistingSourceFile(controllerPath);
  const sourceFile: SourceFile = project.addSourceFileAtPath(controllerPath);

  const controller: ClassDeclaration = sourceFile.getClassOrThrow(className);

  const controllerBase: string = _.trim(
    (<string[]>(
      _.find(controller.getStructure().decorators, (decorator) => decorator.name === 'Controller').arguments
    ))[0],
    `'`,
  );

  let controllerMethods = '';

  controller.getStructure().methods.forEach((method: MethodDeclarationStructure) => {
    if (method.scope === Scope.Private || method.scope === Scope.Protected) {
      return;
    }

    const routingDecorator = _.find(method.decorators, (decorator) =>
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

      (param.decorators || []).forEach((decorator) => {
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
        .map((p) => {
          if (p[0] === ':') {
            return `\${${_.trim(p, `:`)}}`;
          }

          return p;
        }),
    );
    const httpMethod = routingDecorator.name.toLowerCase();
    const urlParams = paramParts.join('/');
    let url = `${apiBase}/${controllerBase}${urlParams ? '/' + urlParams : ''}`;
    const body = bodyParam ? `, body: JSON.stringify(${bodyParam})` : '';

    let queryParser = _.isEmpty(queryMap)
      ? ''
      : _.map(
          queryMap,
          (paramName, decoratorName) => `    queryParts.push(this.queryStringize('${paramName}', ${paramName}));\n`,
        ).join('\n');

    if (queryParser) {
      url += `?\${queryParts.join('&')}`;
    }

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
    // , Authorization: `Bearer: ${this.token}`
    impl += queryParser && `    const queryParts: string[] = [];\n${queryParser}`;
    impl += `    return (await fetch(\`\${this.baseUrl}${url}\`, { method: '${httpMethod}'${body}, headers: { 'Content-Type': 'application/json' } })).json();\n`;
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

const entityFiles = fs.readdirSync(path.join(__dirname, '../shared/entities/')).filter((name) => !name.match(/future/));
const entityMap = _.fromPairs(
  _.map(entityFiles, (p) => {
    const base = p.replace(/\.ts$/, '');
    let className = _.camelCase(base);
    _.capitalize(_.camelCase(base));
    className = _.capitalize(className[0]) + className.slice(1);
    return [className, `../../shared/entities/${base}`];
  }),
);
const entityImports = _.map(entityMap, (path, name) => `import { ${name} } from '${path}';`).join('\n');

const baseMethods = `
  constructor(private baseUrl = 'https://gloomhavendb.com') {}

  private queryStringize(queryParamName: string, data: string | (string | number)[]): string {
    if (!data || !data.length) {
      return '';
    }

    if (typeof data === 'string') {
      return \`\${queryParamName}=\${data}\`;
    }

    if (Array.isArray(data)) {
      return data.map(d => \`\${queryParamName}[]=\${d}\`).join('&');
    }

    // TODO better error message?
    throw new Error('Cannot turn data into query string');
  }
`;

const finalContents = `${entityImports}\n\nexport class GloomhavenDB {${baseMethods}\n${_.trimEnd(sdkMethods)}}\n`;

fs.writeFileSync(path.join(__dirname, `../sdk/generated/gloomhavendb.sdk.ts`), finalContents, {
  encoding: 'utf8',
});
