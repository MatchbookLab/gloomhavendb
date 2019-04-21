import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HomeComponent } from './+home/home.component';
import { LoginComponent } from './+login/login.component';
import { NotFoundComponent } from './+not-found/not-found.component';

import { BetterRoute, RoutePath } from './util/routing';

const routes: BetterRoute[] = [
  {
    path: RoutePath.HOME,
    component: HomeComponent,
    // loadChildren: './+home/home.module#HomeModule',
    pathMatch: 'full',
    data: {
      title: '',
    },
  },
  {
    path: RoutePath.LOGIN,
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
