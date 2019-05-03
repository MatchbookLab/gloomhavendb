import { Pipe, PipeTransform } from '@angular/core';
import { Limit } from '../../../../../shared/constants/limit';
import { Slot } from '../../../../../shared/constants/slot';
import { GdbIcon } from '../../icon/icon.enum';

@Pipe({
  name: 'enumToIcon',
})
export class EnumToIconPipe implements PipeTransform {
  transform(enumValue: Slot | Limit): GdbIcon {
    console.log(Limit);
    switch (enumValue) {
      case Limit.Consumed:
        return GdbIcon.LostOrConsumed;
      case Limit.Spent:
        return GdbIcon.SpendItem;
      case Limit.Unlimited:
        throw new Error('No icon for Limit.Unlimited');
      case Limit.UseOncePerScenario:
        return GdbIcon.CannotRecover;
      case Slot.Body:
        return GdbIcon.Body;
      case Slot.Head:
        return GdbIcon.Head;
      case Slot.Legs:
        return GdbIcon.Legs;
      case Slot.OneHand:
        return GdbIcon.OneHand;
      case Slot.TwoHands:
        return GdbIcon.TwoHands;
      case Slot.SmallItem:
        return GdbIcon.SmallItem;
    }

    throw new Error('Enum not yet supported');
  }
}
