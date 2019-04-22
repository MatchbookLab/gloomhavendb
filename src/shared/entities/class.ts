import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ClassAlias } from '../constants/class-alias';
import { Race } from '../constants/race';

@Entity()
export class Class {
  @PrimaryColumn()
  number: number;

  @Column()
  name: string;

  @Column()
  race: Race;

  @Column()
  alias: ClassAlias;

  @Column()
  cardCount: number;

  @Column()
  iconImageUrl: string;

  @Column()
  verified: boolean;
}
