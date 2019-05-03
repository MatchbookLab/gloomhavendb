import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemSource } from '../../../../shared/constants/item-source';
import { Item } from '../../../../shared/entities/item';
import { TitleService } from '../../services/title/title.service';
import { Limit } from '../../../../shared/constants/limit';
import { GdbIcon } from '../../shared/icon/icon.enum';
import { Slot } from 'src/shared/constants/slot';

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

  constructor(private activateRoute: ActivatedRoute, private titleService: TitleService) {
    this.item = activateRoute.snapshot.data['item'];
  }

  ngOnInit() {
    this.titleService.patchTitle(`#${this.item.number} - ${this.item.name}`);
  }
}
