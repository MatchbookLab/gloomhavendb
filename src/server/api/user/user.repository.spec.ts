import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repo: UserRepository;
  beforeAll(async () => {
    repo = new UserRepository();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
