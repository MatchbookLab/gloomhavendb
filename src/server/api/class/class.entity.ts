import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ClassAlias } from '../../../shared/constants/class-alias';
import { Race } from '../../../shared/constants/race';
import { Class } from '../../../shared/types/entities/class';

@Entity()
export class ClassEntity implements Class {
  @PrimaryColumn() number: number;

  @Column() name: string;

  @Column() race: Race;

  @Column() alias: ClassAlias;

  @Column() cardCount: number;

  @Column() iconImageUrl: string;

  @Column() verified: boolean;
}
