import { ClassAlias } from '../shared/constants/class-alias';
import { Race } from '../shared/constants/race';
import { Class } from '../shared/entities/class';

export const classes: Class[] = [
  {
    id: 1,
    name: 'Brute',
    race: Race.Inox,
    alias: ClassAlias.Brute,
    cardCount: 10,
    iconImageUrl: null,
    verified: false,
  },
];
