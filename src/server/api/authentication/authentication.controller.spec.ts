import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { Connection } from 'typeorm';
import { AuthService } from '../../services/auth/auth.service';

describe('Authentication Controller', () => {
  let fixture: TestingModule;
  beforeAll(async () => {
    fixture = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: Connection,
          useValue: {
            getRepository: () => {},
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    const controller: AuthenticationController = fixture.get<AuthenticationController>(AuthenticationController);
    expect(controller).toBeDefined();
  });
});
