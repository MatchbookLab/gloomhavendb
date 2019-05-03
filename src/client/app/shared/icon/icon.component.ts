import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { invert } from 'lodash';
import { GdbIcon } from './icon.enum';

const InvertedGdbIcon = invert(GdbIcon);

@Component({
  selector: 'gdb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
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

  ngOnInit() {
    this.iconSrc = `/assets/icons/${this.icon}.svg`;
    this.altText = `{${InvertedGdbIcon[this.icon]}}`;
  }
}
