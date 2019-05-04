import { SuggestedFixRepository } from './suggested-fix.repository';

describe('SuggestedFixRepository', () => {
  let repo: SuggestedFixRepository;
  beforeAll(async () => {
    repo = new SuggestedFixRepository();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
