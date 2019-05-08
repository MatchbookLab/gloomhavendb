import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FitTextModule } from '../fit-text/fit-text.module';
import { IconModule } from '../icon/icon.module';
import { BattleGoalCardComponent } from './battle-goal-card.component';

const declareAndExport = [BattleGoalCardComponent];

@NgModule({
  imports: [CommonModule, FontAwesomeModule, FitTextModule, IconModule],
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class BattleGoalCardModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faCheck);
    library.add(faTimes);
  }
}
