import { StorageKey, StorageService } from './storage.service';

// noops all around... just don't do anything on the server!
export class NoopStorageService extends StorageService {
  store<T>(key: StorageKey, data: T): void {}

  load<T>(key: StorageKey): T | null {
    return null;
  }

  remove(key: StorageKey): void {}

  clear(): void {}
}
