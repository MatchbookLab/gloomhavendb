import { NgModule } from '@angular/core';
import { NoopStorageService } from './noop-storage.service';
import { StorageService } from './storage.service';

// only import this in the client tests
@NgModule({
  providers: [
    {
      provide: StorageService,
      useClass: NoopStorageService,
    },
  ],
})
export class StorageTestingModule {}
