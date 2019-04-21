import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

describe('UsersController', () => {
  let fixture: TestingModule;
  beforeAll(async () => {
    fixture = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    const controller: UserController = fixture.get<UserController>(UserController);
    expect(controller).toBeDefined();
  });
});
