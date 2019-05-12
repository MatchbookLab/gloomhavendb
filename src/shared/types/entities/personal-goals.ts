import { ClassAlias } from '../../constants/class-alias';

export interface PersonalGoals {
  id: string;
  name: string;
  text: string;
  objective: string;
  reward: ClassAlias | 'Envelope X';
}
