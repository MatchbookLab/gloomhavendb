import { ItemRepository } from './item.repository';

describe('ItemRepository', () => {
  let repo: ItemRepository;
  beforeAll(async () => {
    repo = new ItemRepository();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
