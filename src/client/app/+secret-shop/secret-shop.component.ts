import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { filter, includes, maxBy, minBy, sortBy } from 'lodash';
import { items } from '../../../data/items';
import { Slot } from '../../../shared/constants/slot';
import { Item } from '../../../shared/entities/item';

@Component({
  selector: 'gdb-not-found',
  templateUrl: './secret-shop.component.html',
  styleUrls: ['./secret-shop.component.scss'],
})
export class SecretShopComponent implements OnInit, AfterViewInit {
  @ViewChild('header') header: ElementRef<HTMLDivElement>;

  Slot = Slot;
  shopItems: Item[];
  shownItems: Item[];

  filters: {
    slot: Slot;
    search: string;
    price: number;
    sort: keyof Item;
  } = {
    slot: null,
    search: '',
    price: 100,
    sort: 'number',
  };

  maxPrice: number;
  minPrice: number;

  @HostBinding('style.paddingTop')
  headerHeight: string = '130px';

  ngOnInit() {
    const itemIds = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      63,
      74,
      89,
      98,
      100,
      101,
      107,
      115,
      116,
      123,
      124,
      130,
      140,
      145,
      146,
      150,
    ];

    this.shopItems = filter(items, item => includes(itemIds, item.number));

    this.filters.price = this.maxPrice = maxBy(this.shopItems, item => item.price).price;
    this.minPrice = minBy(this.shopItems, item => item.price).price;

    this.filter();
  }

  ngAfterViewInit() {
    console.log(this.header.nativeElement, this.header.nativeElement.offsetHeight);
    setTimeout(() => this.adjustHeaderHeight());
  }

  @HostListener('window:resize')
  adjustHeaderHeight() {
    this.headerHeight = `${this.header.nativeElement.offsetHeight + 20}px`;
  }

  setSlot(slot?: Slot) {
    this.filters.slot = slot || null;
    this.filter();
  }

  setPrice(price?: number) {
    this.filters.price = price;
    this.filter();
  }

  setSearchText(search?: string) {
    this.filters.search = (search || '').trim();
    this.filter();
  }

  setSort(sort?: keyof Item) {
    this.filters.sort = sort;
    this.shownItems = sortBy(this.shownItems, item => item[this.filters.sort]);
  }

  private filter() {
    const filteredItems = filter(this.shopItems, item => {
      if (!(!this.filters.slot || item.slot === this.filters.slot)) {
        return false;
      }

      if (!(!this.filters.search || !!item.name.match(new RegExp(this.filters.search, 'i')))) {
        return false;
      }

      return item.price <= this.filters.price;
    });

    this.shownItems = sortBy(filteredItems, item => item[this.filters.sort]);
  }
}
