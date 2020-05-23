import { Component } from '@angular/core';
import { PopupRef } from '../popup-ref.class';

@Component({
  selector: 'gdb-basic-popup',
  template: `
    <gdb-popup-container (backgroundClick)="close()" [isModal]="isModal">
      <div class="content">
        Popup Works!
        <div>
          <button type="button" class="btn" (click)="toggle()">Toggle. Is Modal: {{ isModal }}</button>
        </div>
      </div>
    </gdb-popup-container>
  `,
  styles: [
    `
      .content {
        padding: 20px;
      }
    `,
  ],
})
export class BasicPopupComponent {
  constructor(private popupRef: PopupRef<void>) {}

  get isModal(): boolean {
    return this.popupRef.isModal;
  }

  toggle() {
    this.popupRef.isModal = !this.popupRef.isModal;
  }

  close() {
    this.popupRef.close();
  }
}
