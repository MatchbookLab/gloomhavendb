import * as bcrypt from 'bcryptjs';
import { EntityRepository } from 'typeorm';
import { User } from '../../../shared/entities/user';
import { UserLite } from '../../../shared/types/user-lite';
import { BaseRepository } from '../base.repository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  /** This method finds email in a case-insensitive manner */
  async findByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where(`LOWER(email) = :email`, { email: email.toLowerCase() })
      .getOne();
  }

  async saveNew(user: User): Promise<User> {
    user.password = await this.hashPassword(user.password);

    return super.saveNew(user);
  }

  async hashPassword(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, 12);
  }

  convertToUserLite(user: User): UserLite {
    return {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    };
  }
}
