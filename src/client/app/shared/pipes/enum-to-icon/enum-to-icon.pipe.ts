import { Pipe, PipeTransform } from '@angular/core';
import { Limit } from '../../../../../shared/constants/limit';
import { Slot } from '../../../../../shared/constants/slot';
import { GloomhavenIcon } from '../../icon/icon.enum';

@Pipe({
  name: 'enumToIcon',
})
export class EnumToIconPipe implements PipeTransform {
  transform(enumValue: Slot | Limit): GloomhavenIcon {
    switch (enumValue) {
      case Limit.Consumed:
        return GloomhavenIcon.LostOrConsumed;
      case Limit.Spent:
        return GloomhavenIcon.SpendItem;
      case Limit.Unlimited:
        throw new Error('No icon for Limit.Unlimited');
      case Limit.UseOncePerScenario:
        return GloomhavenIcon.CannotRecover;
      case Slot.Body:
        return GloomhavenIcon.Body;
      case Slot.Head:
        return GloomhavenIcon.Head;
      case Slot.Legs:
        return GloomhavenIcon.Legs;
      case Slot.OneHand:
        return GloomhavenIcon.OneHand;
      case Slot.TwoHands:
        return GloomhavenIcon.TwoHands;
      case Slot.SmallItem:
        return GloomhavenIcon.SmallItem;
    }

    throw new Error('Enum not yet supported. Got: ' + enumValue);
  }
}
