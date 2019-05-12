import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleId } from '../../../shared/constants/role-id';
import { Role } from '../../../shared/types/entities/role';
import { UserEntity } from '../user/user.entity';

@Entity()
export class RoleEntity implements Role {
  @PrimaryColumn('int') id: RoleId;

  @Column({ unique: true }) name: string;

  @OneToMany(() => UserEntity, user => user.role) users: UserEntity[];
}
