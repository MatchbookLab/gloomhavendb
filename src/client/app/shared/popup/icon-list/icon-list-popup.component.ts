import { Component, ElementRef, ViewChild } from '@angular/core';
import { GloomhavenIcon } from '../../icon/icon.enum';
import { PopupRef } from '../popup-ref.class';
import { invert } from 'lodash';

const InvertedGloomhavenIcon = invert(GloomhavenIcon);

@Component({
  selector: 'tc-icon-list-popup',
  templateUrl: './icon-list-popup.component.html',
  styleUrls: ['./icon-list-popup.component.scss'],
})
export class IconListPopup {
  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;

  InvertedGloomhavenIcon = InvertedGloomhavenIcon;

  icons: GloomhavenIcon[] = Object.values(GloomhavenIcon);

  recentlyCopied: string;

  constructor(private popupRef: PopupRef<void>) {}

  close() {
    this.popupRef.close();
  }

  copyToClipboard(icon: GloomhavenIcon) {
    this.recentlyCopied = `{${InvertedGloomhavenIcon[icon]}}`;

    this.inputRef.nativeElement.value = this.recentlyCopied;
    this.inputRef.nativeElement.select();
    document.execCommand('copy');
  }
}
