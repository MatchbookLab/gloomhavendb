import { Component } from '@angular/core';
import { Item } from '../../../shared/entities/item';
import { ResolvedDataService } from '../services/resolver/resolve.service';

export interface ItemsResolveData {
  items: Item[];
}

@Component({
  selector: 'gdb-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss'],
  providers: [ResolvedDataService],
})
export class ItemsPageComponent {
  showNames = false;

  items: Item[];

  constructor(private resolvedDataService: ResolvedDataService<ItemsResolveData>) {
    this.items = this.resolvedDataService.get('items');
  }
}
