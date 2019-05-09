import { RoleId } from '../constants/role-id';

export interface UserLite {
  id: number;
  username: string;
  roleId: RoleId;
}
