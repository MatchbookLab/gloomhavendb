import { Connection } from 'typeorm';
import { UserRepository } from './user/user.repository';

// this is used to prevent cyclical imports
export const repositories = [
  {
    provide: UserRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
    inject: [Connection],
  },
];
