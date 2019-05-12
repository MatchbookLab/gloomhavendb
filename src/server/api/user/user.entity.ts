import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { RoleId } from '../../../shared/constants/role-id';
import { User } from '../../../shared/types/entities/user';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column({ unique: true }) email: string;

  @Column('int') roleId: RoleId;

  @Column({ unique: true }) username: string;

  @Exclude()
  @Column({ nullable: true })
  password: string | null;

  @ManyToOne(() => RoleEntity, role => role.users)
  @JoinColumn()
  role: RoleEntity;

  @Exclude()
  @Column({ nullable: true })
  rememberToken: string | null;

  @Column({ default: false }) confirmed: boolean;

  @Column({ default: true }) active: boolean;

  @CreateDateColumn() created: string;

  @UpdateDateColumn() updated: string;
}
