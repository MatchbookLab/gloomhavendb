import { EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserLite } from '../../../shared/types/user-lite';
import { BaseRepository } from '../base.repository';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  /** This method finds user by email in a case-insensitive manner */
  async findByEmail(email: string): Promise<UserEntity> {
    return this.createQueryBuilder('user.entity.ts')
      .where(`LOWER(email) = :email`, { email: email.toLowerCase() })
      .getOne();
  }

  /** This method finds user by username in a case-insensitive manner */
  async findByUsername(username: string): Promise<UserEntity> {
    return this.createQueryBuilder('user.entity.ts')
      .where(`LOWER(username) = :username`, { username: username.toLowerCase() })
      .getOne();
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity> {
    let user = await this.findByUsername(usernameOrEmail);

    if (!user) {
      user = await this.findByEmail(usernameOrEmail);
    }

    return user;
  }

  convertToUserLite(user: UserEntity): UserLite {
    return {
      id: user.id,
      username: user.username,
      roleId: user.roleId,
    };
  }
}
