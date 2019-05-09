import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { BattleGoal } from '../shared/entities/battle-goal';
import { Class } from '../shared/entities/class';
import { Event } from '../shared/entities/event';
import { Item } from '../shared/entities/item';
import { MapLocation } from '../shared/entities/map-location';
import { PersonalGoals } from '../shared/entities/personal-goals';
import { RandomScenario } from '../shared/entities/random-scenario';
import { Role } from '../shared/entities/role';
import { Scenario } from '../shared/entities/scenario';
import { SuggestedFix } from '../shared/entities/suggested-fix';
import { User } from '../shared/entities/user';
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
import { MailhogEmailer } from './services/emailer/mailhog-emailer';
import { ProductionEmailer } from './services/emailer/production-emailer';

import { repositories } from './api/repositories';

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
      entities: [
        BattleGoal,
        Class,
        Event,
        Item,
        MapLocation,
        PersonalGoals,
        RandomScenario,
        Role,
        Scenario,
        SuggestedFix,
        User,
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
      useClass: PRODUCTION_MODE ? ProductionEmailer : MailhogEmailer,
    },
    IdAbsentGuard,
    IdMatchGuard,
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AppModule {}
