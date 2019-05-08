import { EntityRepository } from 'typeorm';
import { BattleGoal } from '../../../shared/entities/battle-goal';
import { BaseRepository } from '../base.repository';

@EntityRepository(BattleGoal)
export class BattleGoalRepository extends BaseRepository<BattleGoal> {}
