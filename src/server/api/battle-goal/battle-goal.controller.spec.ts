import { Test, TestingModule } from '@nestjs/testing';
import { BattleGoalController } from './battle-goal.controller';
import { BattleGoalRepository } from './battle-goal.repository';

describe('Item Controller', () => {
  let controller: BattleGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleGoalController],
      providers: [
        {
          provide: BattleGoalRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BattleGoalController>(BattleGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
