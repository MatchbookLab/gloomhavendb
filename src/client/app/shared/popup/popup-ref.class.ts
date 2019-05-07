import { OverlayRef } from '@angular/cdk/overlay';

export class PopupRef<R> {
  isModal = true;

  constructor(private overlayRef: OverlayRef) {}

  close() {
    this.overlayRef.detach();
    this.overlayRef.dispose();
  }
}
