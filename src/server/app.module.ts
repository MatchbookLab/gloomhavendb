import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Role } from '../shared/entities/role';
import { User } from '../shared/entities/user';

import { repositories } from './api/repositories';
import { UserController } from './api/user/user.controller';
import { DatabaseNamingStrategy } from './database-naming-strategy';
import {
  DATABASE_DATABASE,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DEVELOPMENT_MODE,
  IS_DOCKER,
  JWT_SECRET,
  PRODUCTION_MODE,
} from './environment';
import { IdAbsentGuard } from './guards/id-absent.guard';
import { IdMatchGuard } from './guards/id-match.guard';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { EmailerService } from './services/emailer/emailer.service';
import { MailhogEmailer } from './services/emailer/mailhog-emailer';

import { ProductionEmailer } from './services/emailer/production-emailer';

const angularUniversal = DEVELOPMENT_MODE
  ? []
  : [
      AngularUniversalModule.forRoot({
        viewsPath: join(process.cwd(), 'dist/client'),
        bundle: require(join(process.cwd(), 'dist/universal/main')),
      }),
    ];

@Module({
  imports: [
    ...angularUniversal,
    TypeOrmModule.forRoot({
      keepConnectionAlive: false,
      name: 'default',
      type: 'postgres',
      host: IS_DOCKER ? 'database' : 'localhost',
      port: 5432,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_DATABASE,
      schema: 'public',
      synchronize: true,
      logging: false,
      namingStrategy: new DatabaseNamingStrategy(),
      entities: [Role, User],
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    ...repositories,
    {
      provide: EmailerService,
      useClass: PRODUCTION_MODE ? ProductionEmailer : MailhogEmailer,
    },
    IdAbsentGuard,
    IdMatchGuard,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
