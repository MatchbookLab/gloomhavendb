import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ClassAlias } from '../../../shared/constants/class-alias';
import { PersonalGoals } from '../../../shared/types/entities/personal-goals';

@Entity()
export class PersonalGoalsEntity implements PersonalGoals {
  @PrimaryColumn('uuid') id: string;
  @Column() name: string;
  @Column() text: string;
  @Column() objective: string;
  @Column() reward: ClassAlias | 'Envelope X';
}
