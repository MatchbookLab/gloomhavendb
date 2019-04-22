import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ClassAlias } from '../constants/class-alias';

@Entity()
export class PersonalGoals {
  // this ID is the little number below the text aka "card number"
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column() text: string;
  @Column() objective: string;
  @Column() reward: ClassAlias | 'Envelope X';
}
