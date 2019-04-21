import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Login } from '../../../shared/types/login';
import { UserRepository } from '../../api/user/user.repository';
import { JwtPayload } from '../../types/jwt-payload';

const failedLoginMessage = 'Username or password was incorrect';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userRepo: UserRepository) {}

  async signIn(login: Login): Promise<string> {
    const user = await this.userRepo.findByEmail(login.email);

    if (!user) {
      throw new HttpException(failedLoginMessage, 401);
    }

    const isPasswordCorrect = await this.comparePasswordHash(login.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(failedLoginMessage, 401);
    }

    const userJwt: JwtPayload = {
      email: user.email,
      user: this.userRepo.convertToUserLite(user),
    };

    return this.jwtService.sign(userJwt);
  }

  private async comparePasswordHash(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
