import { Component, Input } from '@angular/core';
import { BattleGoal } from '../../../../shared/types/entities/battle-goal';
import { GloomhavenIcon } from '../icon/icon.enum';

@Component({
  selector: 'gdb-battle-goal-card',
  templateUrl: './battle-goal-card.component.html',
  styleUrls: ['./battle-goal-card.component.scss'],
})
export class BattleGoalCardComponent {
  Icon = GloomhavenIcon;

  @Input() battleGoal: BattleGoal;
}
