import { Injectable } from '@angular/core';
import { PlatformService } from '../platform/platform.service';

@Injectable({ providedIn: 'root' })
export class ScrollingService {
  constructor(private platform: PlatformService) {}

  get element(): HTMLElement {
    return document.body;
  }

  get overflow(): string {
    return this.element.style.overflow;
  }

  set overflow(val: string) {
    this.element.style.overflow = val;
  }

  get isLocked(): boolean {
    return this.overflow === 'hidden';
  }

  toggle(shouldLock: boolean = null) {
    if (shouldLock === null) {
      shouldLock = !this.isLocked;
    }

    if (shouldLock) {
      this.lock();
    } else {
      this.unlock();
    }
  }

  lock() {
    this.overflow = 'hidden';
  }

  unlock() {
    this.overflow = 'visible';
  }

  scrollTo(y: number | HTMLElement, offsetHeader = true, extraPadding = true) {
    if (!this.platform.isBrowser) {
      return;
    }

    let top = typeof y === 'number' ? y : y.offsetTop;

    if (offsetHeader) {
      top -= this.getHeaderHeight(extraPadding);
    }

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }

  private getHeaderHeight(extraPadding = true): number {
    let headerHeight = document.querySelector<HTMLElement>('gdb-header').offsetHeight;

    if (extraPadding) {
      headerHeight += 20;
    }

    return headerHeight;
  }
}
