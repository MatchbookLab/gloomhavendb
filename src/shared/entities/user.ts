import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleId } from '../constants/role-id';
import { UserLite } from '../types/user-lite';
import { Role } from './role';

@Entity()
export class User implements UserLite {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column('int')
  roleId: RoleId;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column({ nullable: true })
  password: string | null;

  @OneToMany(() => Role, role => role.users)
  @JoinColumn()
  role: Role;

  @Exclude()
  @Column({ nullable: true })
  rememberToken: string | null;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
