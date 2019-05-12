import { RoleId } from '../../constants/role-id';
import { UserLite } from '../user-lite';
import { Role } from './role';

export interface User extends UserLite {
  id: number;
  email: string;
  roleId: RoleId;
  username: string;
  password: string | null;
  role: Role;
  rememberToken: string | null;
  confirmed: boolean;
  active: boolean;
  created: string;
  updated: string;
}
