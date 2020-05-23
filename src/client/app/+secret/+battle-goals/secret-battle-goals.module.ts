import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BattleGoalCardModule } from '../../shared/battle-goal-card/battle-goal-card.module';
import { GdbFormsModule } from '../../shared/forms/forms.module';

import { SecretBattleGoalsComponent } from './secret-battle-goals.component';

const routes: Routes = [
  {
    path: '',
    component: SecretBattleGoalsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretBattleGoalsRoutingModule {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    GdbFormsModule,
    SecretBattleGoalsRoutingModule,
    FontAwesomeModule,
    BattleGoalCardModule,
  ],
  declarations: [SecretBattleGoalsComponent],
})
export class SecretBattleGoalsModule {}
