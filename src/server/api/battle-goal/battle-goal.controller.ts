import { Controller, Get, Param, Query } from '@nestjs/common';
import * as _ from 'lodash';
import { FindConditions } from 'typeorm';
import { battleGoals } from '../../../data/battle-goals';
import { BattleGoalEntity } from './battle-goal.entity';
import { BetterFindManyOptions } from '../base.repository';
import { BattleGoalRepository } from './battle-goal.repository';

@Controller('battle-goals')
export class BattleGoalController {
  constructor(private battleGoalRepo: BattleGoalRepository) {
    this.seed();
  }

  @Get()
  async getBattleGoals(@Query('includeExtendedGoals') includeExtendedGoals?: boolean): Promise<BattleGoalEntity[]> {
    const options: BetterFindManyOptions<BattleGoalEntity> = { order: { name: 'ASC' } };

    const where: FindConditions<BattleGoalEntity> = {};

    if (!includeExtendedGoals) {
      where.isExtendedGoal = false;
    }

    if (!_.isEmpty(where)) {
      options.where = where;
    }

    return await this.battleGoalRepo.smartFind(options);
  }

  @Get(':name')
  async findBattleGoal(@Param('name') name: string): Promise<BattleGoalEntity> {
    name = _.startCase(name);
    return this.battleGoalRepo.findOneOrFail({ where: { name } });
  }

  private async seed() {
    if ((await this.battleGoalRepo.smartFind()).length) {
      return;
    }

    await this.battleGoalRepo.save(battleGoals);
  }
}
