import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HomeComponent } from './+home/home.component';
import { LoginComponent } from './+login/login.component';
import { NotFoundComponent } from './+not-found/not-found.component';
import { SecretMapComponent } from './+secret/+map/secret-map.component';
import { SecretShopComponent } from './+secret/+shop/secret-shop.component';

import { BetterRoute, RoutePath } from './util/routing';

const routes: BetterRoute[] = [
  {
    path: RoutePath.Home,
    component: HomeComponent,
    // loadChildren: './+home/home.module#HomeModule',
    pathMatch: 'full',
    data: {
      title: '',
    },
  },
  {
    path: RoutePath.SecretShop,
    component: SecretShopComponent,
    // loadChildren: './+secret-shop/secret-shop.module#SecretShopModule',
    data: {
      title: 'Secret Shop',
    },
  },
  {
    path: RoutePath.SecretMap,
    component: SecretMapComponent,
    // loadChildren: './+secret-map/secret-map.module#SecretMapModule',
    data: {
      title: 'Secret Map',
    },
  },
  {
    path: RoutePath.Login,
    component: LoginComponent,
    // loadChildren: './+login/login.module#LoginModule',
    data: {
      title: 'Login',
    },
  },

  // this item should be last... only shown if no other match
  {
    path: '**',
    component: NotFoundComponent,
    // loadChildren: './+not-found/not-found.module#NotFoundModule',
    data: {
      title: 'Page Not Found',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
