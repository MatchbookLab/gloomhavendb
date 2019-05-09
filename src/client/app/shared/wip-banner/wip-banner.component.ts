import { trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { PlatformService } from '../../services/platform/platform.service';
import { toVoidTransition } from '../../util/transitions';

const STORAGE_KEY = 'dismissed-wip-banner';

@Component({
  selector: 'gdb-wip-banner-component',
  template: `
    <div [@collapse] class="banner-alert" *ngIf="!dismissed">
      <fa-icon [icon]="'exclamation-triangle'"></fa-icon>
      <div>
        <fa-icon (click)="dismiss()" class="pointer dismiss" [icon]="'times'"></fa-icon>
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
  dismissed = true;

  constructor(platformService: PlatformService) {
    if (platformService.isBrowser) {
      this.dismissed = !!localStorage.getItem(STORAGE_KEY);
    }
  }

  dismiss() {
    localStorage.setItem(STORAGE_KEY, 'true');
    this.dismissed = true;
  }
}
