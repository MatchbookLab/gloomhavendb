import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RoleId } from '../../../shared/constants/role-id';
import { User } from '../../../shared/entities/user';
import { AuthResponse } from '../../../shared/types/auth-response';
import { Login } from '../../../shared/types/login';
import { UserRepository } from '../../api/user/user.repository';
import { JwtPayload } from '../../../shared/types/jwt-payload';

const failedLoginMessage = 'Username or password was incorrect';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userRepo: UserRepository) {}

  async signIn(login: Login): Promise<AuthResponse> {
    const user = await this.userRepo.findByUsernameOrEmail(login.emailOrUsername);

    if (!user) {
      throw new HttpException(failedLoginMessage, 401);
    }

    const isPasswordCorrect = await this.comparePasswordHash(login.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(failedLoginMessage, 401);
    }

    const userLite = this.userRepo.convertToUserLite(user);

    const userJwt: JwtPayload = {
      email: user.email,
      user: userLite,
    };

    return {
      token: this.jwtService.sign(userJwt),
      userLite,
    };
  }

  async signUp(user: User): Promise<User> {
    user.password = await this.createPasswordHash(user.password);

    user.active = true;
    user.confirmed = true;
    user.roleId = RoleId.User;
    user.rememberToken = null;

    user = await this.userRepo.saveNew(user);

    return this.userRepo.smartFindOneOrFail(user.id);
  }

  private async comparePasswordHash(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private async createPasswordHash(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, 12);
  }
}
