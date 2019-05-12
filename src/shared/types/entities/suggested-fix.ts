import { SuggestedFixType } from '../../constants/suggested-fix-type';

export interface SuggestedFix<T> {
  id?: string;
  type: SuggestedFixType;
  idOrNumber: string;
  data: T;
  author?: string;
  created?: string;
  updated?: string;
}
