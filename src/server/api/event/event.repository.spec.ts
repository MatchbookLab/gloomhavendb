import { EventRepository } from './event.repository';

describe('EventRepository', () => {
  let repo: EventRepository;
  beforeAll(async () => {
    repo = new EventRepository();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
