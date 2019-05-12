import { ClassAlias } from '../../constants/class-alias';
import { Race } from '../../constants/race';

export interface Class {
  number: number;
  name: string;
  race: Race;
  alias: ClassAlias;
  cardCount: number;
  iconImageUrl: string;
  verified: boolean;
}
