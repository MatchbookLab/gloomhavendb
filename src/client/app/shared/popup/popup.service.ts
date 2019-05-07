import { Overlay } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { BasicPopupComponent } from './basic/basic-popup.component';
import { PopupRef } from './popup-ref.class';

@Injectable()
export class PopupService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  basicPopup(): PopupRef<void> {
    return this.openComponent<void>(BasicPopupComponent);
  }

  openTemplate(templateRef: CdkPortal) {}

  private openComponent<R>(component: ComponentType<any>): PopupRef<R> {
    const overlayRef = this.overlay.create();

    const popupRef = new PopupRef<R>(overlayRef);

    const injectionTokens = new WeakMap();

    injectionTokens.set(PopupRef, popupRef);

    const injector = new PortalInjector(this.injector, injectionTokens);

    const componentPortal = new ComponentPortal<any>(component, null, injector);

    overlayRef.attach(componentPortal);

    return popupRef;
  }
}
