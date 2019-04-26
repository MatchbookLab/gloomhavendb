import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { mapLocations } from '../../../data/map-locations';
import { MAP_SIZE, MAP_URL } from '../../../shared/constants/map';
import { MapLocation } from '../../../shared/entities/map-location';

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
  mapUrlCss = `url('${MAP_URL}')`;
  stickers: OurMapLocation[];
  focusedSticker: OurMapLocation;
  readonly scaleStep = 0.2;
  readonly maxZoom = 10;
  readonly minZoom = 1;
  zoom: number = 5;

  get scale(): number {
    return 1 / (1 + this.scaleStep) ** (11 - this.zoom);
  }

  get transform(): string {
    return `scale(${this.scale})`;
  }

  @HostBinding('style.height')
  @HostBinding('style.width')
  get mapSize(): string {
    return this.scale * MAP_SIZE + 'px';
  }

  async ngOnInit() {
    this.stickers = mapLocations;

    const onTheBoard: Partial<OurMapLocation>[] = [
      {
        number: 1,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 2,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 3,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 4,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 5,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 6,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 7,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 8,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 9,
        completed: false,
        available: true,
        inaccessible: true,
      },
      {
        number: 10,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 13,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 14,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 15,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 18,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 19,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 20,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 21,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 22,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 23,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 26,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 27,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 28,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 31,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 35,
        completed: false,
        available: true,
        inaccessible: true,
      },
      {
        number: 36,
        completed: false,
        available: true,
        inaccessible: true,
      },
      {
        number: 37,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 38,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 43,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 46,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 51,
        completed: false,
        available: true,
        inaccessible: true,
      },
      {
        number: 52,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 53,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 54,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 68,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 70,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 72,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 76,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 81,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 82,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 83,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 93,
        completed: true,
        available: true,
        inaccessible: false,
      },
    ];

    _.forEach(this.stickers, sticker => _.assign(sticker, _.find(onTheBoard, { number: sticker.number })));
  }

  stickerClick(sticker: OurMapLocation) {
    this.focusedSticker = sticker;
  }

  numberClick(sticker: OurMapLocation) {
    sticker.available = !sticker.available;
  }

  checkboxClick(sticker: OurMapLocation) {
    if (sticker.inaccessible) {
      return;
    }

    sticker.completed = !sticker.completed;
  }

  @HostListener('document:keydown.escape')
  defocusStickers() {
    this.focusedSticker = null;
  }

  zoomIn() {
    this.zoom = Math.min(this.zoom + 1, this.maxZoom);
  }

  zoomOut() {
    this.zoom = Math.max(this.zoom - 1, this.minZoom);
  }
}
