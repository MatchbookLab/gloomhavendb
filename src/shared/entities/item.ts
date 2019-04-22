import { Slot } from '../constants/slot';
import { Limit } from '../constants/limit';
import { ItemSource } from '../constants/item-source';

export interface Item {
  id: number;
  // the little number at the bottom of the front
  cardNo: number;
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
