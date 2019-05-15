import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExplodedPart, explodeStringWithIcons } from '../../util/icon-codes';
import { GloomhavenIcon } from '../icon/icon.enum';

// note the funky layout for the HTML is to maintain consistent whitespace

@Component({
  selector: 'gdb-text-with-icons',
  templateUrl: './text-with-icons.component.html',
  styleUrls: ['./text-with-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextWithIconsComponent {
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

  explodeText(): ExplodedPart[] {
    console.log(this.text);
    return explodeStringWithIcons((this.text || '').replace(/(\r\n|\r|\n)/g, '<br />'));
  }
}
