import { Body, Controller, Post } from '@nestjs/common';
import { RoleId } from '../../../shared/constants/role-id';
import { User } from '../../../shared/entities/user';
import { Login } from '../../../shared/types/login';

import { AuthService } from '../../services/auth/auth.service';
import { RoleRepository } from '../role/role.repository';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthService, private roleRepo: RoleRepository) {
    this.seed();
  }

  @Post('login')
  async login(@Body() login: Login): Promise<{ token: string }> {
    return await this.authService.signIn(login);
  }

  // disable signups for now
  // @Post('signup')
  async signup(@Body() user: User): Promise<User> {
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
