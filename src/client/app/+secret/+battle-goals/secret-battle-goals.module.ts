import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FitTextModule } from '../../shared/fit-text/fit-text.module';
import { GdbFormsModule } from '../../shared/forms.module';
import { BattleGoalComponent } from '../../shared/battle-goal/battle-goal.component';
import { BattleGoalModule } from '../../shared/battle-goal/battle-goal.module';

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
    BattleGoalModule,
    FitTextModule,
  ],
  declarations: [SecretBattleGoalsComponent],
})
export class SecretBattleGoalsModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faCheck);
    library.add(faTimes);
  }
}
