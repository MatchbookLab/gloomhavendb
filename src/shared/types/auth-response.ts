import { UserLite } from './user-lite';

export interface AuthResponse {
  token: string;
  userLite: UserLite;
}
