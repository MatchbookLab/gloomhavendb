import { Injectable } from '@angular/core';

export enum StorageKey {
  DismissedWipBanner = 'DismissedWipBanner',
  FixSubmittedBy = 'FixSubmittedBy',
  BearToken = 'BearerToken',
  UserLite = 'UserLite',
}

@Injectable()
export abstract class StorageService {
  abstract store<T>(key: StorageKey, data: T): void;

  abstract load<T>(key: StorageKey): T | null;

  abstract remove(key: StorageKey): void;

  abstract clear(): void;
}
