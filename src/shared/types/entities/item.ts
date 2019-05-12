import { ItemSource } from '../../constants/item-source';
import { Limit } from '../../constants/limit';
import { Slot } from '../../constants/slot';

export interface Item {
  number: number;
  name: string;
  slot: Slot;
  price: number;
  text: string;
  count: number;
  limit: Limit;
  uses: number | null;
  negativeCardsCount: number | null;
  sourceType: ItemSource;
  sourceId: number | null;
  imageUrl: string;
  verified: boolean;
}
