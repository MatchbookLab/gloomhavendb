import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { cloneDeep, isEqual } from 'lodash';
import { Subscription } from 'rxjs';
import { filter, skip } from 'rxjs/operators';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Item } from '../../../../shared/entities/item';
import { SuggestedFix } from '../../../../shared/entities/suggested-fix';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { MetaTagsService } from '../../services/meta-tags/meta-tags.service';
import { ResolvedDataService } from '../../services/resolver/resolve.service';
import { PopupService } from '../../shared/popup/popup.service';
import { cleanIconCode } from '../../util/icon-codes';

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
export class ItemPageComponent implements OnInit, OnDestroy {
  item: Item;
  suggestedFixes: SuggestedFix<Item>[];

  header: string;
  showDiffPopup: boolean;
  diffToView: Item;

  dbItem: Item;

  editable = false;

  isAdmin = false;

  private routerSub: Subscription;

  constructor(
    private api: ApiService,
    private popupService: PopupService,
    private resolvedDataService: ResolvedDataService<ItemResolveData>,
    private metaService: MetaTagsService,
    private authService: AuthService,
    router: Router,
  ) {
    this.routerSub = router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        skip(1),
      )
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  ngOnInit() {
    this.item = this.resolvedDataService.get('item');
    this.dbItem = cloneDeep(this.item);
    this.suggestedFixes = this.resolvedDataService.get('suggestedFixes') || [];

    this.header = `${this.item.name} - Item ${this.item.number}`;

    this.isAdmin = this.authService.isAdmin();

    const cleanText = cleanIconCode(this.item.text);

    this.metaService.updateTags({
      title: this.header,
      description: cleanText,
      image: this.item.imageUrl,
      keywords: [this.item.name, `Item ${this.item.number}`, 'Item'],
    });
  }

  openPopup(item: Item) {
    this.diffToView = item;
    this.showDiffPopup = true;
  }

  async commitFix(fix: SuggestedFix<Item>) {
    await this.api.commitFix({ id: fix.id });
    this.suggestedFixes = await this.api.getMatchingSuggestedFixes<Item>(SuggestedFixType.Item, this.item.number + '');
  }

  closePopup() {
    this.diffToView = null;
    this.showDiffPopup = false;
  }

  loadSuggestedFix(item: Item) {
    this.item = item;
  }

  async submitFix(suggestedFix: SuggestedFix<Item>) {
    this.editable = false;

    // TODO message for submitting same item
    const anyTheSame =
      isEqual(suggestedFix.data, this.dbItem) || this.suggestedFixes.some(sf => isEqual(sf.data, suggestedFix.data));

    if (anyTheSame) {
      return;
    }

    await this.api.suggestFix<Item>(suggestedFix);
    this.suggestedFixes = await this.api.getMatchingSuggestedFixes<Item>(SuggestedFixType.Item, this.item.number + '');
  }

  reset() {
    this.editable = false;
    this.item = cloneDeep(this.dbItem);
  }

  trackById<T extends { id: string } = { id: string }>(index: number, data: T) {
    if (!data) {
      return null;
    }

    return data.id;
  }
}
