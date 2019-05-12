import { Body, Controller, Post } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { RoleId } from '../../../shared/constants/role-id';
import { UserEntity } from '../user/user.entity';
import { AuthResponse } from '../../../shared/types/auth-response';
import { Login } from '../../../shared/types/login';

import { AuthService } from '../../services/auth/auth.service';
import { RoleRepository } from '../role/role.repository';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthService, private roleRepo: RoleRepository) {
    this.seed();
  }

  @Post('login')
  @ApiExcludeEndpoint()
  async login(@Body() login: Login): Promise<AuthResponse> {
    return await this.authService.signIn(login);
  }

  // disable signups for now
  // @Post('signup')
  async signup(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.authService.signUp(user);
  }

  private async seed(): Promise<void> {
    await Promise.all([
      this.roleRepo.save({
        id: RoleId.Admin,
        name: 'Admin',
      }),
      this.roleRepo.save({
        id: RoleId.User,
        name: 'User',
      }),
    ]);
  }
}
