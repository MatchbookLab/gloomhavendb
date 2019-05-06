import { Component, OnInit } from '@angular/core';
import { ItemSource } from '../../../../shared/constants/item-source';
import { Limit } from '../../../../shared/constants/limit';
import { Slot } from '../../../../shared/constants/slot';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Item } from '../../../../shared/entities/item';
import { SuggestedFix } from '../../../../shared/entities/suggested-fix';
import { ApiService } from '../../services/api/api.service';
import { ResolvedDataService } from '../../services/resolver/resolve.service';
import { TitleService } from '../../services/title/title.service';
import { GdbIcon } from '../../shared/icon/icon.enum';

export interface ItemResolveData {
  item: Item;
  suggestedFixes: SuggestedFix<Item>[];
}

@Component({
  selector: 'gdb-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ResolvedDataService],
})
export class ItemComponent implements OnInit {
  Icon = GdbIcon;
  Limit = Limit;
  Slot = Slot;
  ItemSource = ItemSource;

  slots: Slot[] = Object.values(Slot);
  limits: Limit[] = Object.values(Limit);
  sources: ItemSource[] = Object.values(ItemSource);

  item: Item;
  suggestedFixes: SuggestedFix<Item>[];

  constructor(
    private titleService: TitleService,
    private api: ApiService,
    private resolvedDataService: ResolvedDataService<ItemResolveData>,
  ) {
    this.item = this.resolvedDataService.get('item');
    this.suggestedFixes = this.resolvedDataService.get('suggestedFixes');
  }

  async ngOnInit() {
    this.titleService.patchTitle(`${this.item.name} - Item ${this.item.number}`);
  }

  async submitFix(item: Item) {
    await this.api.suggestFix<Item>({
      type: SuggestedFixType.Item,
      paramKey: item.number + '',
      data: item,
    });
  }
}
