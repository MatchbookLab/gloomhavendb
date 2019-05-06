import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';
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
  header: string;

  constructor(
    private titleService: TitleService,
    private api: ApiService,
    private resolvedDataService: ResolvedDataService<ItemResolveData>,
    private meta: Meta,
    private location: Location,
  ) {
    this.item = this.resolvedDataService.get('item');
    this.suggestedFixes = this.resolvedDataService.get('suggestedFixes');
  }

  ngOnInit() {
    this.header = `${this.item.name} - Item ${this.item.number}`;
    this.titleService.patchTitle(this.header);

    // zzz
    this.meta.updateTag({ name: 'description', content: this.item.text });

    // TODO remove the "gloomhavendb.com" base once we have full URLs set up
    this.meta.updateTag({ name: 'og:image', content: `https://gloomhavendb.com${this.item.imageUrl}` });
    this.meta.updateTag({ name: 'og:title', content: this.header });
    this.meta.updateTag({ name: 'og:description', content: this.item.text });

    // TODO remove the "gloomhavendb.com" base once we have full URLs set up
    this.meta.updateTag({ name: 'twitter:image', content: `https://gloomhavendb.com${this.item.imageUrl}` });
    this.meta.updateTag({ name: 'twitter:title', content: this.header });
    this.meta.updateTag({ name: 'twitter:description', content: this.item.text });

    // TODO move these to somewhere global
    this.meta.updateTag({ name: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'website' });
    this.meta.updateTag({ name: 'twitter:site', content: `https://gloomhavendb.com` });
    this.meta.updateTag({ name: 'og:site_name', content: 'Gloomhaven DB' });
    this.meta.updateTag({ name: 'og:url', content: `https://gloomhavendb.com${this.location.path()}` });
  }

  async submitFix(item: Item) {
    await this.api.suggestFix<Item>({
      type: SuggestedFixType.Item,
      paramKey: item.number + '',
      data: item,
    });
  }
}
