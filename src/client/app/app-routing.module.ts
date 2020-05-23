import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { BaseRoutePath, BetterRoute } from './util/routing';

const routes: BetterRoute<BaseRoutePath | '**'>[] = [
  {
    path: BaseRoutePath.Home,
    loadChildren: () => import('./+home/home-page.module').then((m) => m.HomePageModule),
    pathMatch: 'full',
    data: {
      title: '',
    },
  },
  {
    path: BaseRoutePath.Items,
    loadChildren: () => import('./+items/items-page.module').then((m) => m.ItemsPageModule),
    data: {
      title: 'Items',
    },
  },
  {
    path: BaseRoutePath.Events,
    loadChildren: () => import('./+events/events-page.module').then((m) => m.EventsPageModule),
    data: {
      title: 'Events',
    },
  },

  {
    path: BaseRoutePath.SecretShop,
    loadChildren: () => import('./+secret/+shop/secret-shop.module').then((m) => m.SecretShopModule),
    data: {
      title: 'Secret Shop',
    },
  },
  {
    path: BaseRoutePath.SecretMap,
    loadChildren: () => import('./+secret/+map/secret-map.module').then((m) => m.SecretMapModule),
    data: {
      title: 'Secret Map',
    },
  },
  {
    path: BaseRoutePath.SecretEvents,
    loadChildren: () => import('./+secret/+events/secret-events.module').then((m) => m.SecretEventsModule),
    data: {
      title: 'Secret Events',
    },
  },
  {
    path: BaseRoutePath.SecretBattleGoals,
    loadChildren: () =>
      import('./+secret/+battle-goals/secret-battle-goals.module').then((m) => m.SecretBattleGoalsModule),
    data: {
      title: 'Secret Battle Goals',
    },
  },
  {
    path: BaseRoutePath.Login,
    loadChildren: () => import('./+login/login-page.module').then((m) => m.LoginPageModule),
    data: {
      title: 'Login',
    },
  },

  // this item should be last... only shown if no other match
  {
    path: '**',
    loadChildren: () => import('./+not-found/not-found-page.module').then((m) => m.NotFoundPageModule),
    data: {
      title: 'Page Not Found',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
