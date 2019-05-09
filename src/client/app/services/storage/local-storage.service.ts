import { StorageKey, StorageService } from './storage.service';

export class LocalStorageService extends StorageService {
  store<T>(key: StorageKey, data: T): void {
    localStorage.setItem(this.wrapStorageKey(key), JSON.stringify(data));
  }

  load<T>(key: StorageKey): T | null {
    const wrappedKey = this.wrapStorageKey(key);
    try {
      const strData = localStorage.getItem(wrappedKey);
      return JSON.parse(strData) || null;
    } catch (e) {
      return null;
    }
  }

  remove(key: StorageKey): void {
    localStorage.removeItem(this.wrapStorageKey(key));
  }

  clear(): void {
    localStorage.clear();
  }

  protected wrapStorageKey(key: StorageKey): string {
    return `GloomhavenDB::${key}`;
  }
}
