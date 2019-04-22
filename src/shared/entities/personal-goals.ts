import { ClassAlias } from '../constants/class-alias';

export interface PersonalGoals {
  // this ID is the little number below the text aka "card number"
  id: number;
  name: string;
  text: string;
  objective: string;
  reward: ClassAlias | 'Envelope X';
}
