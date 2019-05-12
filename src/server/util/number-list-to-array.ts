import { NumberList } from '../../shared/types/number-list';

export function numberListToArray(numberList: NumberList): number[] {
  const array = Array.isArray(numberList) ? numberList : numberList.split(/[,\t |]/);
  return array.map(num => +num);
}
