(<any>global).fetch = require('node-fetch');

import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NoopStorageService } from './services/storage/noop-storage.service';
import { StorageService } from './services/storage/storage.service';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ModuleMapLoaderModule, // <-- *Important* to have lazy-loaded routes work
    ServerTransferStateModule,
    TransferHttpCacheModule,
  ],
  providers: [
    {
      provide: StorageService,
      useClass: NoopStorageService,
    },
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {}
