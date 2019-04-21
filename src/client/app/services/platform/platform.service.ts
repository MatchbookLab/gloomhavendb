import { isPlatformBrowser, isPlatformServer, isPlatformWorkerApp, isPlatformWorkerUi } from '@angular/common';
import { APP_ID, Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(APP_ID) public appId: string) {}

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  get isWorkerApp(): boolean {
    return isPlatformWorkerApp(this.platformId);
  }

  get isWorkerUi(): boolean {
    return isPlatformWorkerUi(this.platformId);
  }
}
