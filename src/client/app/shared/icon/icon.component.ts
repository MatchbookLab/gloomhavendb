import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { GdbIcon } from './icon.enum';

@Component({
  selector: 'gdb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() icon: GdbIcon;
  @Input() size: number = 16;

  @HostBinding('style.width')
  get width(): string {
    return this.size + 'px';
  }

  @HostBinding('style.height')
  get height(): string {
    return this.size + 'px';
  }

  iconSrc: string;

  ngOnInit() {
    this.iconSrc = `/assets/icons/${this.icon}.svg`;
  }
}
