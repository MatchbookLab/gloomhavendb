import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemRepository } from './item.repository';

describe('Item Controller', () => {
  let controller: ItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
