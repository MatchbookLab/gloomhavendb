import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemSource } from '../../../../shared/constants/item-source';
import { Limit } from '../../../../shared/constants/limit';
import { Slot } from '../../../../shared/constants/slot';
import { Item } from '../../../../shared/entities/item';
import { GdbIcon } from '../icon/icon.enum';

@Component({
  selector: 'gdb-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() item: Item;
  @Input() editable = false;

  @Output() submit: EventEmitter<Item> = new EventEmitter<Item>();

  Icon = GdbIcon;
  Limit = Limit;
  Slot = Slot;
  ItemSource = ItemSource;

  slots: Slot[] = Object.values(Slot);
  limits: Limit[] = Object.values(Limit);
  sources: ItemSource[] = Object.values(ItemSource);

  onSubmit() {
    this.submit.emit(this.item);
  }
}
