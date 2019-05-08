import { Test, TestingModule } from '@nestjs/testing';
import { MapLocationController } from './map-location.controller';
import { MapLocationRepository } from './map-location.repository';

describe('MapLocationController', () => {
  let controller: MapLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapLocationController],
      providers: [
        {
          provide: MapLocationRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MapLocationController>(MapLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
