import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PrebootModule } from 'preboot';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformService } from './services/platform/platform.service';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'gloomhavendb' }),
    PrebootModule.withConfig({ appRoot: 'gdb-root' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: 'ExternalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> => {
        window.location.href = (route.data as any).externalUrl;

        // this prevents the component from flashing, and also allows "back" to work as expected
        return new Promise(resolve => {});
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (platformService: PlatformService) =>
        <HttpInterceptor>{
          intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            if (req.url[0] !== '/') {
              return next.handle(req);
            }

            const baseUrl = platformService.isServer ? 'http://localhost:3000' : '';

            const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
            return next.handle(apiReq);
          },
        },
      multi: true,
      deps: [PlatformService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
