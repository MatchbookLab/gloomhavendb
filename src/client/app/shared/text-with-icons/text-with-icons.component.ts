import { Component, Input, OnInit } from '@angular/core';
import { ExplodedPart, explodeStringWithIcons } from '../../util/icon-codes';
import { GloomhavenIcon } from '../icon/icon.enum';

// note the funky layout for the HTML is to maintain consistent whitespace

@Component({
  selector: 'gdb-text-with-icons',
  templateUrl: './text-with-icons.component.html',
  styleUrls: ['./text-with-icons.component.scss'],
})
export class TextWithIconsComponent implements OnInit {
  Icon = GloomhavenIcon;
  parts: ExplodedPart[] = [];

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
    return explodeStringWithIcons(this.text.replace(/(\r\n|\r|\n)/g, '<br />'));
  }
}
