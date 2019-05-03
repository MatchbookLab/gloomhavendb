import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../../shared/entities/item';
import { TitleService } from '../../services/title/title.service';
import { Limit } from '../../../../shared/constants/limit';
import { GdbIcon } from '../../shared/icon/icon.enum';

@Component({
  selector: 'gdb-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  Icon = GdbIcon;
  Limit = Limit;
  item: Item;

  constructor(private activateRoute: ActivatedRoute, private titleService: TitleService) {
    this.item = activateRoute.snapshot.data['item'];
  }

  ngOnInit() {
    this.titleService.patchTitle(this.item.name);
    // this.titleService.patchTitle('Boots of Awesome');
  }
}
