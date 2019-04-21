import { ApplicationRef, enableProdMode, Injector, NgModuleRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () =>
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((moduleRef: NgModuleRef<AppModule>) => {
      if (!environment.production) {
        const applicationRef = moduleRef.injector.get(ApplicationRef);
        const componentRef = applicationRef.components[0];
        // allows to run `ng.profiler.timeChangeDetection();`
        enableDebugTools(componentRef);
      }

      applicationInjector = moduleRef.injector;

      return moduleRef;
    });

declare const module: any;

export let applicationInjector: Injector;

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.log(err));
  });
}
