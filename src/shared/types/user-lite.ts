import { RoleId } from '../constants/role-id';

export interface UserLite {
  id: number;
  email: string;
  roleId: RoleId;
}
