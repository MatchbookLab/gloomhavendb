import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemSource } from '../../../../shared/constants/item-source';
import { Limit } from '../../../../shared/constants/limit';
import { Slot } from '../../../../shared/constants/slot';
import { Item } from '../../../../shared/entities/item';
import { ApiService } from '../../services/api/api.service';
import { TitleService } from '../../services/title/title.service';
import { GdbIcon } from '../../shared/icon/icon.enum';

@Component({
  selector: 'gdb-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
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

  constructor(private activateRoute: ActivatedRoute, private titleService: TitleService, private api: ApiService) {
    this.item = activateRoute.snapshot.data['item'];
  }

  ngOnInit() {
    this.titleService.patchTitle(`${this.item.name} - Item ${this.item.number}`);
  }

  async submitFix(item: Item) {
    await this.api.suggestFix<Item>({
      entityType: Item.name,
      entityIdOrNumber: item.number,
      data: item,
    });
  }
}
