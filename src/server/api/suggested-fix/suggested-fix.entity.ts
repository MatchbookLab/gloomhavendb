import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SuggestedFixType } from '../../../shared/constants/suggested-fix-type';
import { SuggestedFix } from '../../../shared/types/entities/suggested-fix';

@Entity()
export class SuggestedFixEntity<T> implements SuggestedFix<T> {
  @PrimaryGeneratedColumn('uuid') id?: string;

  @Column({ enum: SuggestedFixType }) type: SuggestedFixType;

  @Column('varchar') idOrNumber: string;

  @Column('json') data: T;

  @Column({ nullable: true }) author?: string;

  @CreateDateColumn() created?: string;

  @UpdateDateColumn() updated?: string;
}
