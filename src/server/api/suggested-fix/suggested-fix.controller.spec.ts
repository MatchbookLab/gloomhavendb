import { Test, TestingModule } from '@nestjs/testing';
import { ItemRepository } from '../item/item.repository';
import { SuggestedFixController } from './suggested-fix.controller';
import { SuggestedFixRepository } from './suggested-fix.repository';

describe('SuggestedFixController', () => {
  let controller: SuggestedFixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestedFixController],
      providers: [
        {
          provide: SuggestedFixRepository,
          useValue: {},
        },
        {
          provide: ItemRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SuggestedFixController>(SuggestedFixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
