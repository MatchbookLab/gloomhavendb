import { Component, Input, OnInit } from '@angular/core';
import { GdbIcon } from '../icon/icon.enum';

const regex: RegExp = new RegExp(`\{\\s*(${Object.keys(GdbIcon).join('|')})\\s*\}`, 'g');
// const regex: RegExp = new RegExp(`{([\\s\\S]+?)}`, 'g');

type ExplodedPart = string | GdbIcon;

@Component({
  selector: 'gdb-text-with-icons',
  // note the funky layout for the HTML is to maintain consistent whitespace
  templateUrl: './text-with-icons.component.html',
  styleUrls: ['./text-with-icons.component.scss'],
})
export class TextWithIconsComponent implements OnInit {
  Icon = GdbIcon;
  parts: ExplodedPart[] = [];

  constructor() {}

  private _text: string;

  get text(): string {
    return this._text;
  }

  @Input()
  set text(value: string) {
    this._text = value;
    this.parts = this.explodeText();
  }

  ngOnInit() {}

  explodeText(): ExplodedPart[] {
    return (this.text || '').replace(/(\r\n|\r|\n)/g, '<br />').split(regex);
  }
}
