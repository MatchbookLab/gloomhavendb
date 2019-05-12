import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ItemSource } from '../../../shared/constants/item-source';
import { Limit } from '../../../shared/constants/limit';
import { Slot } from '../../../shared/constants/slot';
import { Item } from '../../../shared/types/entities/item';

@Entity()
export class ItemEntity implements Item {
  // this is the item number and is *not* generated
  @PrimaryColumn() number: number;
  @Column() name: string;
  @Column('enum', { enum: Slot }) slot: Slot;
  @Column() price: number;
  @Column() text: string;
  @Column({ nullable: true /* hopefully temp */ }) count: number;
  @Column('enum', { enum: Limit, nullable: true /* hopefully temp */ }) limit: Limit;
  @Column({ nullable: true }) uses: number | null;
  @Column({ nullable: true }) negativeCardsCount: number | null;
  @Column('enum', { enum: ItemSource, nullable: true }) sourceType: ItemSource;
  @Column({ nullable: true }) sourceId: number | null;
  @Column() imageUrl: string;
  @Column() verified: boolean;
}
