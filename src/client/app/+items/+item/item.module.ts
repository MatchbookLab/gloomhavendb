import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IconModule } from '../../shared/icon/icon.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { TextWithIconsModule } from '../../shared/text-with-icons/text-with-icons.module';

import { ItemComponent } from './item.component';
import { ItemResolver } from './item.resolver';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
    resolve: {
      item: ItemResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ItemResolver],
})
export class ItemRouterModule {}

@NgModule({
  imports: [CommonModule, ItemRouterModule, IconModule, PipesModule, FormsModule, TextWithIconsModule],
  declarations: [ItemComponent],
})
export class ItemModule {}
