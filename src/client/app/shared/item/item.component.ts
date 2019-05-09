import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemSource } from '../../../../shared/constants/item-source';
import { Limit } from '../../../../shared/constants/limit';
import { Slot } from '../../../../shared/constants/slot';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Item } from '../../../../shared/entities/item';
import { SuggestedFix } from '../../../../shared/entities/suggested-fix';
import { GloomhavenIcon } from '../icon/icon.enum';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'gdb-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() item: Item;
  @Input() readonly editable = false;

  @Output() submit: EventEmitter<SuggestedFix<Item>> = new EventEmitter<SuggestedFix<Item>>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  Icon = GloomhavenIcon;
  Limit = Limit;
  Slot = Slot;
  ItemSource = ItemSource;

  slots: Slot[] = Object.values(Slot);
  limits: Limit[] = Object.values(Limit);
  sources: ItemSource[] = Object.values(ItemSource);

  submittedBy: string;

  constructor(private popupService: PopupService) {}

  onSubmit() {
    this.item.negativeCardsCount = this.item.negativeCardsCount || null;
    this.item.uses = this.item.uses || null;
    this.item.sourceId = this.item.sourceType === ItemSource.RandomItemDesign ? null : this.item.sourceId;

    this.submit.emit({
      type: SuggestedFixType.Item,
      idOrNumber: this.item.number + '',
      data: this.item,
      author: this.submittedBy || null,
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  openListOfIconsPopup() {
    this.popupService.openIconListPopup();
  }
}
