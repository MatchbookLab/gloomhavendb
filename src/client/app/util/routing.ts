import { Data, Route } from '@angular/router';

export interface RouteData extends Data {
  title?: string;
}

export interface BetterRoute<RouteEnum extends string> extends Route {
  path: RouteEnum;
  data: RouteData;
}

export enum BaseRoutePath {
  Home = '',
  Login = 'login',

  Items = 'items',
  Item = 'items/:number',

  Events = 'events',
  Event = 'events/:type/:number',

  SecretShop = 'secret/shop',
  SecretMap = 'secret/map',
  SecretEvents = 'secret/events',
  SecretBattleGoals = 'secret/battle-goals',
}
