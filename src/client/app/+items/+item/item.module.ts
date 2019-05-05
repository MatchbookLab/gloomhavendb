import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Item } from '../../../../shared/entities/item';
import { SuggestedFix } from '../../../../shared/entities/suggested-fix';
import { IconModule } from '../../shared/icon/icon.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import {
  EntityIdOrNumberKey,
  EntityType,
  SuggestedFixesResolver,
} from '../../shared/resolvers/suggested-fixes/suggested-fixes.resolver';
import { TextWithIconsModule } from '../../shared/text-with-icons/text-with-icons.module';

import { ItemComponent } from './item.component';
import { ItemResolver } from './item.resolver';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
    resolve: {
      item: ItemResolver,
      suggestedFixes: SuggestedFixesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ItemResolver,
    SuggestedFixesResolver,
    {
      provide: EntityType,
      useValue: Item.name,
    },
    {
      provide: EntityIdOrNumberKey,
      useValue: 'number',
    },
  ],
})
export class ItemRouterModule {}

@NgModule({
  imports: [CommonModule, ItemRouterModule, IconModule, PipesModule, FormsModule, TextWithIconsModule],
  declarations: [ItemComponent],
})
export class ItemModule {}
