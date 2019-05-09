import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../services/auth/auth.service';
import { RoleRepository } from '../role/role.repository';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let fixture: TestingModule;
  beforeAll(async () => {
    fixture = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: RoleRepository,
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
