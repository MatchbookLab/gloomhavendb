import { createParamDecorator } from '@nestjs/common';
import { UserLite } from '../../shared/types/user-lite';

export const LoggedInUser = createParamDecorator((data: any, req: { user: UserLite }) => {
  return req.user;
});
