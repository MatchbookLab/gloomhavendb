import { MapLocationRepository } from './map-location.repository';

describe('MapLocationRepository', () => {
  let repo: MapLocationRepository;
  beforeAll(async () => {
    repo = new MapLocationRepository();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
