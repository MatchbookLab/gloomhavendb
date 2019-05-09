import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleId } from '../constants/role-id';
import { User } from './user';

@Entity()
export class Role {
  @PrimaryColumn('int')
  id: RoleId;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
