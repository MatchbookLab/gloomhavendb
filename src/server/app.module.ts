import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppServerModule } from '../client/app/app.server.module';

import { BattleGoalEntity } from './api/battle-goal/battle-goal.entity';
import { ClassEntity } from './api/class/class.entity';
import { EventEntity } from './api/event/event.entity';
import { ItemEntity } from './api/item/item.entity';
import { MapLocationEntity } from './api/map-location/map-location.entity';
import { PersonalGoalsEntity } from './api/personal-goal/personal-goals.entity';
import { RandomScenarioEntity } from './api/random-scenario/random-scenario.entity';
import { RoleEntity } from './api/role/role.entity';
import { ScenarioEntity } from './api/scenario/scenario.entity';
import { SuggestedFixEntity } from './api/suggested-fix/suggested-fix.entity';
import { UserEntity } from './api/user/user.entity';
import { AuthenticationController } from './api/authentication/authentication.controller';
import { BattleGoalController } from './api/battle-goal/battle-goal.controller';

import { EventController } from './api/event/event.controller';
import { ItemController } from './api/item/item.controller';
import { MapLocationController } from './api/map-location/map-location.controller';
import { SuggestedFixController } from './api/suggested-fix/suggested-fix.controller';
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
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { EmailerService } from './services/emailer/emailer.service';
import { MailhogEmailer } from './services/emailer/mailhog.emailer';
import { MailgunEmailer } from './services/emailer/mailgun.emailer';

import { repositories } from './api/repositories';

const angularUniversal: any[] = DEVELOPMENT_MODE
  ? []
  : [
      // AngularUniversalModule.forRoot({
      //   viewsPath: join(process.cwd(), 'dist/client'),
      //   bootstrap: AppServerModule,
      //   // bundle: require(join(process.cwd(), 'dist/universal/main')),
      // }),
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
      entities: [
        BattleGoalEntity,
        ClassEntity,
        EventEntity,
        ItemEntity,
        MapLocationEntity,
        PersonalGoalsEntity,
        RandomScenarioEntity,
        RoleEntity,
        ScenarioEntity,
        SuggestedFixEntity,
        UserEntity,
      ],
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [
    AuthenticationController,
    EventController,
    ItemController,
    UserController,
    SuggestedFixController,
    MapLocationController,
    BattleGoalController,
  ],
  providers: [
    ...repositories,
    {
      provide: EmailerService,
      useClass: PRODUCTION_MODE ? MailgunEmailer : MailhogEmailer,
    },
    IdAbsentGuard,
    IdMatchGuard,
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AppModule {}
