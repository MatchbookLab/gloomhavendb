import { UserLite } from './user-lite';

export interface JwtPayload {
  email: string;
  user: UserLite;
}
