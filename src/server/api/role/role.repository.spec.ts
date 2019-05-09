import { RoleRepository } from './role.repository';

describe('RoleRepository', () => {
  let repo: RoleRepository;
  beforeAll(async () => {
    repo = new RoleRepository();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
