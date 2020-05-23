import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FitTextModule } from '../fit-text/fit-text.module';
import { IconModule } from '../icon/icon.module';
import { BattleGoalCardComponent } from './battle-goal-card.component';

const declareAndExport = [BattleGoalCardComponent];

@NgModule({
  imports: [CommonModule, FontAwesomeModule, FitTextModule, IconModule],
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class BattleGoalCardModule {}
