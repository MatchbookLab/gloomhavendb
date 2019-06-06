import { enableProdMode } from '@angular/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as compression from 'compression';
import * as express from 'express';
import { Express } from 'express';
import * as helmet from 'helmet';

import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { AppModule } from './app.module';
import { DEVELOPMENT_MODE, HOSTNAME, PRODUCTION_MODE, PROTOCOL, STAGING_MODE } from './environment';
import { EntityNotFoundErrorFilter } from './filters/entity-not-found.filter';
import { QueryFailedErrorFilter } from './filters/query-failed-error.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';

// untpyed imports
const forceDomain = require('forcedomain');
const RateLimit = require('express-rate-limit'); // can go back to `import` after new version is released

declare const module: any;

// declare module 'forcedomain' {
//   import { RequestHandlerParams } from 'express-serve-static-core';
//
//   function forcedomain(options: {
//     hostname: string;
//     port?: number;
//     protocol?: string;
//     type?: 'temporary' | 'permanent';
//     excludeRule?: RegExp;
//   }): RequestHandlerParams;
//
//   export default forcedomain;
// }
//

console.log(`Running in ${process.env.NODE_ENV || 'development'} mode`);

bootstrap();

export async function bootstrap(): Promise<NestExpressApplication> {
  const expressApp: Express = express();

  // We use a CDN in production, so almost no resources actually hit this server
  expressApp.use(compression());

  if (PRODUCTION_MODE) {
    expressApp.use(
      forceDomain({
        hostname: HOSTNAME,
        protocol: PROTOCOL,
      }),
    );
  }

  if (PRODUCTION_MODE || STAGING_MODE) {
    enableProdMode();
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressApp));

  // some security considerations
  app.use(
    // TODO monitor this, this may not be enough... no need to be stingy, mostly just trying to protect from bots
    RateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
      message: {
        status: 429,
        message: 'Rate Limit Error: Too many requests in too short a time, please try again later.',
      },
    }),
  );
  app.use(helmet());

  // global Nest-specific middleware
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new QueryFailedErrorFilter());
  app.useGlobalFilters(new EntityNotFoundErrorFilter());

  const options = new DocumentBuilder()
    .setTitle('Gloomhaven DB API')
    .setDescription('Public-ish API for the Gloomhaven DB API')
    .setVersion('0.1')
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // this is a public API, after all
  app.enableCors();

  await app.listen(3000);

  if (DEVELOPMENT_MODE) {
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  }

  return app;
}
