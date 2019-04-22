import { Data, Route } from '@angular/router';

export interface RouteData extends Data {
  title: string;
}

export interface BetterRoute extends Route {
  path: RoutePath | '**';
  data: RouteData;
}

export enum RoutePath {
  HOME = '',
  LOGIN = 'login',
  SECRET_SHOP = 'secret-shop',
}
