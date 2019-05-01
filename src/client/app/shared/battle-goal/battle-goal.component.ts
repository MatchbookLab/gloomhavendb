import { Component, Input } from '@angular/core';
import { BattleGoal } from '../../../../shared/entities/battle-goal';

@Component({
  selector: 'gdb-battle-goal',
  templateUrl: './battle-goal.component.html',
  styleUrls: ['./battle-goal.component.scss'],
})
export class BattleGoalComponent {
  @Input() battleGoal: BattleGoal;
}
