import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../services/title/title.service';

@Component({
  selector: 'gdb-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  itemNumber: number;

  constructor(private activateRoute: ActivatedRoute, private titleService: TitleService) {
    this.itemNumber = +activateRoute.snapshot.paramMap.get('number');
  }

  ngOnInit() {
    this.titleService.patchTitle('Boots of Awesome');
  }
}
