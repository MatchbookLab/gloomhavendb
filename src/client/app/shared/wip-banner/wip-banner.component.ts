import { trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PlatformService } from '../../services/platform/platform.service';
import { StorageKey, StorageService } from '../../services/storage/storage.service';
import { toVoidTransition } from '../../util/transitions';

@Component({
  selector: 'gdb-wip-banner-component',
  template: `
    <div [@collapse] class="banner-alert" *ngIf="!dismissed">
      <fa-icon [icon]="warningIcon"></fa-icon>
      <div>
        <fa-icon (click)="dismiss()" class="pointer dismiss" [icon]="closeIcon"></fa-icon>
        <div class="small-spacer">
          This site is still <em>very much</em> a work in progress. Consider it a pre-alpha and not ready for
          consumption.
        </div>
        If you're here to help, be aware that many of the spoiler filters are not ready, so browse at your own risk.
      </div>
    </div>
  `,
  animations: [trigger('collapse', [toVoidTransition])],
})
export class WipBannerComponent {
  closeIcon = faTimes;
  warningIcon = faExclamationTriangle;
  dismissed = true;

  constructor(platformService: PlatformService, private storageService: StorageService) {
    this.dismissed = this.storageService.load<boolean>(StorageKey.DismissedWipBanner);
  }

  dismiss() {
    this.storageService.store<boolean>(StorageKey.DismissedWipBanner, true);
    this.dismissed = true;
  }
}
