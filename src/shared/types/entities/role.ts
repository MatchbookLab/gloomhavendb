import { RoleId } from '../../constants/role-id';
import { User } from './user';

export interface Role {
  id: RoleId;
  name: string;
  users: User[];
}
