import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SuggestedFixType } from '../constants/suggested-fix-type';

@Entity()
export class SuggestedFix<T> {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ enum: SuggestedFixType })
  type: SuggestedFixType;

  @Column('varchar')
  idOrNumber: string;

  @Column('json')
  data: T;

  @Column({ nullable: true })
  author?: string;

  @CreateDateColumn()
  created?: string;

  @UpdateDateColumn()
  updated?: string;
}
