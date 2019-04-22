import { Race } from '../constants/race';
import { ClassAlias } from '../constants/class-alias';

export interface Class {
  id: number;
  name: string;
  race: Race;
  alias: ClassAlias;
  cardCount: number;
  iconImageUrl: string;
  verified: boolean;
}
