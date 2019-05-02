import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemComponent } from './item.component';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRouterModule {}

@NgModule({
  imports: [RouterModule, ItemRouterModule],
  declarations: [ItemComponent],
})
export class ItemModule {}
