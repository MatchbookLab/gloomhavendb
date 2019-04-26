import { style } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { MAP_URL, MapLocation, mapLocations } from '../../../data/map-locations';

enum Key {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
  Space = ' ',
}

interface PositionAdjustment {
  direction: 'left' | 'top';
  amount: number;
}

@Component({
  selector: 'gdb-secret-map',
  templateUrl: './secret-map.component.html',
  styleUrls: ['./secret-map.component.scss'],
})
export class SecretMapComponent implements OnInit {
  @HostBinding('style.backgroundImage')
  backgroundUrl = `url('${MAP_URL}')`;
  stickers: MapLocation[];
  focusedSticker: MapLocation;
  currentPositions$: Observable<MapLocation[]>;

  constructor() {}

  private _index = 0;

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
    this.focusedSticker = this.stickers[this.index];
  }

  async ngOnInit() {
    // const stickers: string = localStorage.getItem('stickers');
    // this.stickers = stickers ? JSON.parse(stickers) : mapLocations;
    // this.stickers.forEach(sticker => (sticker.transparent = false));

    this.stickers = mapLocations;

    // this.index = _.findIndex(this.stickers, sticker => !sticker.checkbox);
    //
    // console.log(this.index);
    // setTimeout(() => {
    //   window.scrollTo({
    //     left: this.focusedSticker.position.left * 66 - 200,
    //     top: this.focusedSticker.position.top * 66 - 200,
    //   });
    // });

    // this.currentPositions$ = fromEvent(document, 'keydown').pipe(
    //   filter(() => !!this.focusedSticker),
    //   filter((event: KeyboardEvent) => _.includes(Object.values(Key), event.key)),
    //   tap(() => event.preventDefault()),
    //   tap(
    //     (event: KeyboardEvent) =>
    //       event.key === Key.Space && (this.focusedSticker.transparent = !this.focusedSticker.transparent),
    //   ),
    //   filter((event: KeyboardEvent) => event.key !== Key.Space),
    //   map((event: KeyboardEvent) => this.convertKeyboardEventToPositionAdjustment(event)),
    //   tap(
    //     (adjustment: PositionAdjustment) =>
    //       (this.focusedSticker.position[adjustment.direction] =
    //         Math.round(1000 * (this.focusedSticker.position[adjustment.direction] + adjustment.amount)) / 1000),
    //   ),
    //   tap(() => localStorage.setItem('stickers', JSON.stringify(this.stickers))),
    //   map(() => this.stickers),
    // );
  }

  stickerClick(sticker: MapLocation, event: MouseEvent) {
    return;

    if (sticker.id !== this.focusedSticker.id) {
      return;
    }

    sticker.checkbox = {
      absolute: {
        left: event.clientX,
        top: event.clientY,
      },
      relative: {
        left: event.offsetX,
        top: event.offsetY,
      },
    };

    const img: HTMLImageElement = <HTMLImageElement>event.target;
    sticker.width = img.width;
    sticker.height = img.height;

    localStorage.setItem('stickers', JSON.stringify(this.stickers));

    this.index++;

    console.log(this.focusedSticker.position.left * 66, this.focusedSticker.position.top * 66);
    window.scrollTo({
      left: this.focusedSticker.position.left * 66 - 200,
      top: this.focusedSticker.position.top * 66 - 200,
    });

    return;

    // if (this.focusedSticker) {
    //   this.focusedSticker.transparent = false;
    // }
    // this.focusedSticker = sticker;
  }

  @HostListener('document:keydown.escape')
  defocusSticker() {
    // if (this.focusedSticker) {
    //   this.focusedSticker.transparent = false;
    //   this.focusedSticker = null;
    // }
  }

  convertKeyboardEventToPositionAdjustment(event: KeyboardEvent): PositionAdjustment {
    const amount = (event.shiftKey ? 0.25 : 0.025) * (event.key === Key.Up || event.key === Key.Left ? -1 : 1);
    const direction: 'left' | 'top' = event.key === Key.Right || event.key === Key.Left ? 'left' : 'top';

    return {
      direction,
      amount,
    };
  }
}
