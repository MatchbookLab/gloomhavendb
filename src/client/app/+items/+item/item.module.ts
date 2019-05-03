import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { GloomhavenDB } from '../../../../sdk/generated/gloomhavendb.sdk';
import { IconModule } from '../../shared/icon/icon.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { TextWithIconsModule } from '../../shared/text-with-icons/text-with-icons.module';

import { ItemComponent } from './item.component';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
    resolve: {
      item: 'itemResolver',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'itemResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        new GloomhavenDB('http://localhost:4200').findItem(route.paramMap.get('number')),
    },
  ],
})
export class ItemRouterModule {}

@NgModule({
  imports: [CommonModule, ItemRouterModule, IconModule, PipesModule, FormsModule, TextWithIconsModule],
  declarations: [ItemComponent],
})
export class ItemModule {}
