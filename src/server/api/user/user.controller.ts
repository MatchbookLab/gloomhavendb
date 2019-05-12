import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { RoleId } from '../../../shared/constants/role-id';
import { UserEntity } from './user.entity';
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
  @ApiExcludeEndpoint()
  async getUsers(@LoggedInUser() user: UserLite): Promise<UserEntity[]> {
    return this.userRepo.smartFind();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  async findUser(@Param('id') id: string, @LoggedInUser() cur: UserLite): Promise<UserEntity> {
    return this.userRepo.smartFindOneOrFail(id);
  }
}
