import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { filter, maxBy, minBy, sortBy } from 'lodash';
import { GloomhavenDB } from '../../../sdk/generated/gloomhavendb.sdk';
import { Slot } from '../../../shared/constants/slot';
import { Item } from '../../../shared/entities/item';
import { ScrollingService } from '../services/scrolling/scrolling.service';

@Component({
  selector: 'gdb-not-found',
  templateUrl: './secret-shop.component.html',
  styleUrls: ['./secret-shop.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-30%)', opacity: 0, overflow: 'hidden' }),
        animate('274ms ease-in-out', style({ transform: '*', opacity: '*', overflow: '*' })),
      ]),
      transition(
        ':leave',
        animate('274ms ease-in-out', style({ transform: 'translateY(-30%)', opacity: 0, overflow: 'hidden' })),
      ),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, overflow: 'hidden' }),
        animate('350ms ease-in-out', style({ opacity: '*', overflow: '*' })),
      ]),
      transition(':leave', animate('350ms ease-in-out', style({ opacity: 0, overflow: 'hidden' }))),
    ]),
  ],
})
export class SecretShopComponent implements OnInit, AfterViewInit {
  @ViewChild('header') header: ElementRef<HTMLDivElement>;

  Slot = Slot;
  shopItems: Item[];
  shownItems: Item[];

  enlargedItem: Item = null;

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

  constructor(private scrollingService: ScrollingService) {}

  async ngOnInit() {
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
      76,
      89,
      98,
      100,
      101,
      107,
      114,
      115,
      116,
      123,
      124,
      130,
      134,
      140,
      141,
      145,
      146,
      150,
    ];

    this.shopItems = await new GloomhavenDB().getItems(itemIds);

    this.filters.price = this.maxPrice = maxBy(this.shopItems, item => item.price).price;
    this.minPrice = minBy(this.shopItems, item => item.price).price;

    this.filter();
  }

  ngAfterViewInit() {
    setTimeout(() => this.adjustHeaderHeight());
  }

  @HostListener('window:resize')
  adjustHeaderHeight() {
    this.headerHeight = `${this.header.nativeElement.offsetHeight + 20}px`;
  }

  setSlot(slot?: Slot) {
    console.log(slot);
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

  @HostListener('document:keydown.escape')
  enlargeItem(item: Item) {
    this.enlargedItem = item;

    if (item) {
      this.scrollingService.lock();
    } else {
      this.scrollingService.unlock();
    }
  }

  filter() {
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
