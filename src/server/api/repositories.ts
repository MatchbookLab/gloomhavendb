import { Connection } from 'typeorm';
import { BattleGoalRepository } from './battle-goal/battle-goal.repository';
import { EventRepository } from './event/event.repository';
import { ItemRepository } from './item/item.repository';
import { MapLocationRepository } from './map-location/map-location.repository';
import { RoleRepository } from './role/role.repository';
import { SuggestedFixRepository } from './suggested-fix/suggested-fix.repository';
import { UserRepository } from './user/user.repository';

// this is used to prevent cyclical imports
export const repositories = [
  {
    provide: EventRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(EventRepository),
    inject: [Connection],
  },
  {
    provide: ItemRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(ItemRepository),
    inject: [Connection],
  },
  {
    provide: UserRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
    inject: [Connection],
  },
  {
    provide: RoleRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(RoleRepository),
    inject: [Connection],
  },
  {
    provide: SuggestedFixRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(SuggestedFixRepository),
    inject: [Connection],
  },
  {
    provide: MapLocationRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(MapLocationRepository),
    inject: [Connection],
  },
  {
    provide: BattleGoalRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(BattleGoalRepository),
    inject: [Connection],
  },
];
