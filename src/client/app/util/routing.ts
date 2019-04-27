import { Data, Route } from '@angular/router';

export interface RouteData extends Data {
  title: string;
}

export interface BetterRoute extends Route {
  path: RoutePath | '**';
  data: RouteData;
}

export enum RoutePath {
  Home = '',
  Login = 'login',
  SecretShop = 'secret/shop',
  SecretMap = 'secret/map',
  SecretEvents = 'secret/events',
}
