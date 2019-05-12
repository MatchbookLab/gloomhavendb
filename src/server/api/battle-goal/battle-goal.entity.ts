import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BattleGoal } from '../../../shared/types/entities/battle-goal';

@Entity()
export class BattleGoalEntity implements BattleGoal {
  @PrimaryColumn() id: number;

  @Column() name: string;

  @Column() isExtendedGoal: boolean;

  @Column() text: string;

  @Column() checks: 1 | 2;

  @Column() imageUrl: string;

  @Column() verified: boolean;
}
