import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import {
  ClassDeclaration,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  Project,
  Scope,
  SourceFile,
} from 'ts-morph';

const apiBase = '/api';

const project = new Project({
  tsConfigFilePath: path.join(__dirname, '../server/tsconfig.server.json'),
});

const controllers = {
  ItemController: path.join(__dirname, '../server/api/item/item.controller.ts'),
  EventController: path.join(__dirname, '../server/api/event/event.controller.ts'),
};

_.forEach(controllers, (controllerPath, className) => {
  const sourceFile: SourceFile = project.addExistingSourceFile(controllerPath);

  const controller: ClassDeclaration = sourceFile.getClassOrThrow(className);

  const controllerBase: string = _.trim(
    (<string[]>_.find(controller.getStructure().decorators, decorator => decorator.name === 'Controller').arguments)[0],
    `'`,
  );

  let fileContents = '';

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
      });

      let str = param.isRestParameter ? '...' : '';
      str += paramMap[param.name] || param.name;
      str += param.hasQuestionToken ? '?' : '';
      str += `: ${param.type}`;

      // console.log(param.decorators);

      return str;
    });

    const params: string = _.compact(paramsArr).join(', ');

    const paramKeys = _.compact(
      _.trim((<string[]>routingDecorator.arguments)[0], `'`)
        .split('/')
        .map(p => _.trim(p, `:`)),
    );
    const httpMethod = routingDecorator.name.toLowerCase();
    const urlParams = _.map(paramKeys, paramDecoratorName => `\${${paramDecoratorName}}`).join('/');
    const url = `${apiBase}/${controllerBase}${urlParams ? '/' + urlParams : ''}`;
    const body = bodyParam ? `, ${bodyParam}` : '';

    let impl = '\n';
    impl += `  ${method.isAsync ? 'async ' : ''}${method.name}(${params}): ${method.returnType} {\n`;
    impl += `    return (await this.axios.${httpMethod}(\`${url}\`${body})).data;\n`;
    impl += `  }\n`;

    fileContents += impl;
  });

  const parts: string[] = _.kebabCase(className).split('-');
  parts.pop();
  const fileName = parts.join('-');

  const finalContents = `export class ${_.capitalize(_.camelCase(fileName))}SDK {${fileContents}}\n`;

  fs.promises.writeFile(path.join(__dirname, `../sdk/generated/${fileName}.sdk.ts`), finalContents, {
    encoding: 'utf8',
  });
});
