import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuggestedFix<T> {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  entityType: string; // entity name, i.e. "Item"

  @Column('varchar')
  entityIdOrNumber: string | number;

  @Column('json')
  data: T;

  @Column({ nullable: true })
  author?: string;
}
