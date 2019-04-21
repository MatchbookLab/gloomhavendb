import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { applicationInjector } from '../../main';

export function isServer() {
  if (!applicationInjector) {
    return false;
  }

  const platformId = applicationInjector.get(PLATFORM_ID);

  return isPlatformServer(platformId);
}
