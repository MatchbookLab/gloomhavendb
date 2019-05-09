import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';
import { invert } from 'lodash';
import { GloomhavenIcon } from './icon.enum';

const InvertedGloomhavenIcon = invert(GloomhavenIcon);

@Component({
  selector: 'gdb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  @Input() icon: GloomhavenIcon;
  @Input() size: number = 26;
  iconSrc: string;
  altText: string;

  @HostBinding('style.padding')
  padding: string;

  @HostBinding('style.height')
  height: string;

  ngOnChanges() {
    this.iconSrc = `/assets/icons/${this.icon}.svg`;
    this.altText = `{${InvertedGloomhavenIcon[this.icon]}}`;
    this.padding = `0 ${this.size / 20}px`;
    this.height = `${this.size}px`;
  }
}
