import { Component, OnInit } from '@angular/core';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Item } from '../../../../shared/entities/item';
import { SuggestedFix } from '../../../../shared/entities/suggested-fix';
import { ApiService } from '../../services/api/api.service';
import { MetaTagsService } from '../../services/meta-tags/meta-tags.service';
import { ResolvedDataService } from '../../services/resolver/resolve.service';
import { PopupService } from '../../shared/popup/popup.service';

export interface ItemResolveData {
  item: Item;
  suggestedFixes: SuggestedFix<Item>[];
}

@Component({
  selector: 'gdb-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
  providers: [ResolvedDataService],
})
export class ItemPageComponent implements OnInit {
  item: Item;
  suggestedFixes: SuggestedFix<Item>[];
  header: string;
  showDiffPopup: boolean;

  editable = false;

  constructor(
    private api: ApiService,
    private popupService: PopupService,
    private resolvedDataService: ResolvedDataService<ItemResolveData>,
    private metaService: MetaTagsService,
  ) {
    this.item = this.resolvedDataService.get('item');
    this.suggestedFixes = this.resolvedDataService.get('suggestedFixes') || [];
  }

  ngOnInit() {
    this.header = `${this.item.name} - Item ${this.item.number}`;

    this.metaService.updateTags({
      title: this.header,
      description: this.item.text,
      image: this.item.imageUrl,
      keywords: [this.item.name, `Item ${this.item.number}`, 'Item'],
    });
  }

  openPopup() {
    this.showDiffPopup = true;
  }

  closePopup() {
    this.showDiffPopup = false;
  }

  async submitFix(item: Item) {
    await this.api.suggestFix<Item>({
      type: SuggestedFixType.Item,
      idOrNumber: item.number + '',
      data: item,
    });

    this.editable = false;
  }
}
