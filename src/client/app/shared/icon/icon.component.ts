import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';
import { invert } from 'lodash';
import { GdbIcon } from './icon.enum';

const InvertedGdbIcon = invert(GdbIcon);

@Component({
  selector: 'gdb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  @Input() icon: GdbIcon;
  @Input() size: number = 26;
  iconSrc: string;
  altText: string;

  @HostBinding('style.width')
  get width(): string {
    return this.size + 'px';
  }

  @HostBinding('style.height')
  get height(): string {
    return this.size + 'px';
  }

  ngOnChanges() {
    this.iconSrc = `/assets/icons/${this.icon}.svg`;
    this.altText = `{${InvertedGdbIcon[this.icon]}}`;
  }
}
