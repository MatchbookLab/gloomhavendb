import { Component } from '@angular/core';
import { InvertedGloomhavenIcon } from '../../../util/icon-codes';
import { GloomhavenIcon } from '../../icon/icon.enum';
import { PopupRef } from '../popup-ref.class';

@Component({
  selector: 'tc-icon-list-popup',
  templateUrl: './icon-list-popup.component.html',
  styleUrls: ['./icon-list-popup.component.scss'],
})
export class IconListPopup {
  InvertedGloomhavenIcon = InvertedGloomhavenIcon;

  icons: GloomhavenIcon[] = Object.values(GloomhavenIcon);

  recentlyCopied: string;

  constructor(private popupRef: PopupRef<void>) {}

  close() {
    this.popupRef.close();
  }

  copyToClipboard(icon: GloomhavenIcon, input: HTMLInputElement) {
    this.recentlyCopied = `{${InvertedGloomhavenIcon[icon]}}`;

    input.select();
    document.execCommand('copy');
    input.blur();
  }
}
