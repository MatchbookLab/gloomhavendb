import { EntityRepository } from 'typeorm';
import { User } from '../../../shared/entities/user';
import { UserLite } from '../../../shared/types/user-lite';
import { BaseRepository } from '../base.repository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  /** This method finds user by email in a case-insensitive manner */
  async findByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where(`LOWER(email) = :email`, { email: email.toLowerCase() })
      .getOne();
  }

  /** This method finds user by username in a case-insensitive manner */
  async findByUsername(username: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where(`LOWER(username) = :username`, { username: username.toLowerCase() })
      .getOne();
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    let user = await this.findByUsername(usernameOrEmail);

    if (!user) {
      user = await this.findByEmail(usernameOrEmail);
    }

    return user;
  }

  convertToUserLite(user: User): UserLite {
    return {
      id: user.id,
      username: user.username,
      roleId: user.roleId,
    };
  }
}
