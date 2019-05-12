import { EntityRepository } from 'typeorm';
import { BattleGoalEntity } from './battle-goal.entity';
import { BaseRepository } from '../base.repository';

@EntityRepository(BattleGoalEntity)
export class BattleGoalRepository extends BaseRepository<BattleGoalEntity> {}
