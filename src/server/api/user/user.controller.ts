import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleId } from '../../../shared/constants/role-id';
import { User } from '../../../shared/entities/user';
import { UserLite } from '../../../shared/types/user-lite';
import { LoggedInUser } from '../../decorators/logged-in-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { UserRepository } from './user.repository';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(RoleId.Admin)
export class UserController {
  constructor(private readonly userRepo: UserRepository) {}

  @Get()
  async getUsers(@LoggedInUser() user: UserLite): Promise<User[]> {
    return this.userRepo.smartFind();
  }

  @Get(':id')
  async findUser(@Param('id') id: string, @LoggedInUser() cur: UserLite): Promise<User> {
    return this.userRepo.smartFindOneOrFail(id);
  }
}
