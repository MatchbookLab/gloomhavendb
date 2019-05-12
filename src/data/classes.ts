import { ClassAlias } from '../shared/constants/class-alias';
import { Race } from '../shared/constants/race';
import { ClassEntity } from '../server/api/class/class.entity';

export const classes: ClassEntity[] = [
  {
    number: 1,
    name: 'Brute',
    race: Race.Inox,
    alias: ClassAlias.Brute,
    cardCount: 10,
    iconImageUrl: null,
    verified: false,
  },
];
