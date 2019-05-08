import { Component, Input } from '@angular/core';
import { BattleGoal } from '../../../../shared/entities/battle-goal';
import { GdbIcon } from '../icon/icon.enum';

@Component({
  selector: 'gdb-battle-goal-card',
  templateUrl: './battle-goal-card.component.html',
  styleUrls: ['./battle-goal-card.component.scss'],
})
export class BattleGoalCardComponent {
  Icon = GdbIcon;

  @Input() battleGoal: BattleGoal;
}
