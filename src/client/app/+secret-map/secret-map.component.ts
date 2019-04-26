import { style } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { MAP_URL, MapLocation, mapLocations } from '../../../data/map-locations';

interface OurMapLocation extends MapLocation {
  available?: boolean;
  inaccessible?: boolean;
  completed?: boolean;
}

@Component({
  selector: 'gdb-secret-map',
  templateUrl: './secret-map.component.html',
  styleUrls: ['./secret-map.component.scss'],
})
export class SecretMapComponent implements OnInit {
  @HostBinding('style.backgroundImage')
  backgroundUrl = `url('${MAP_URL}')`;
  stickers: OurMapLocation[];
  focusedSticker: OurMapLocation;

  async ngOnInit() {
    this.stickers = mapLocations;

    const onTheBoard: Partial<OurMapLocation>[] = [
      {
        id: 1,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 2,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 3,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 4,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 5,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 6,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 7,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 8,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 9,
        completed: false,
        available: false,
        inaccessible: true,
      },
      {
        id: 10,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 13,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 14,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 15,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 18,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 19,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 20,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 21,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 22,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 23,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 26,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 27,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 28,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        id: 31,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 35,
        completed: false,
        available: false,
        inaccessible: true,
      },
      {
        id: 36,
        completed: false,
        available: false,
        inaccessible: true,
      },
      {
        id: 37,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 38,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        id: 43,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 46,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        id: 51,
        completed: false,
        available: false,
        inaccessible: true,
      },
      {
        id: 52,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 53,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 54,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 68,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 70,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 72,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        id: 76,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        id: 81,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 82,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        id: 83,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        id: 93,
        completed: true,
        available: true,
        inaccessible: false,
      },
    ];

    _.forEach(this.stickers, sticker => _.assign(sticker, _.find(onTheBoard, { id: sticker.id })));
  }

  stickerClick(sticker: OurMapLocation) {
    this.focusedSticker = sticker;
  }

  numberClick(sticker: OurMapLocation) {
    sticker.available = !sticker.available;
  }

  checkboxClick(sticker: OurMapLocation) {
    sticker.completed = !sticker.completed;
  }

  @HostListener('document:keydown.escape')
  defocusStickers() {
    this.focusedSticker = null;
  }
}
