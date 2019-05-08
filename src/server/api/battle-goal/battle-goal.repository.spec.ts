import { BattleGoalRepository } from './battle-goal.repository';

describe('BattleGoalRepository', () => {
  let repo: BattleGoalRepository;
  beforeAll(async () => {
    repo = new BattleGoalRepository();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
