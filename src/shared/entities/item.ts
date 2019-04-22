import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ItemSource } from '../constants/item-source';
import { Limit } from '../constants/limit';
import { Slot } from '../constants/slot';

@Entity()
export class Item {
  // this is the item number and is _not_ generated
  @PrimaryColumn() number: number;
  // the little number at the bottom of the front (this is unique per card and not really helpful here)
  /* @deprecated */ cardNo: number;
  @Column() name: string;
  @Column('enum', { enum: Slot }) slot: Slot;
  @Column() price: number;
  @Column() text: string;
  @Column() count: number;
  @Column('enum', { enum: Limit }) limit: Limit;
  @Column() uses: number | null;
  @Column() negativeCardsCount: number | null;
  @Column('enum', { enum: ItemSource }) sourceType: ItemSource;
  @Column() sourceId: number | null;
  @Column() imageUrl: string;
  @Column() verified: boolean;
}
