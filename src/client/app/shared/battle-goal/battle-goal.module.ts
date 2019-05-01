import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FitTextModule } from '../fit-text/fit-text.module';
import { BattleGoalComponent } from './battle-goal.component';

const declareAndExport = [BattleGoalComponent];

@NgModule({
  imports: [CommonModule, FontAwesomeModule, FitTextModule],
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class BattleGoalModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faCheck);
    library.add(faTimes);
  }
}
