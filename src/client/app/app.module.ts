import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PrebootModule } from 'preboot';
import { Observable } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { PlatformService } from './services/platform/platform.service';
import { LocalStorageService } from './services/storage/local-storage.service';
import { StorageService } from './services/storage/storage.service';
import { startsWith } from 'lodash';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'gloomhavendb' }),
    PrebootModule.withConfig({ appRoot: 'gdb-root' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (authService: AuthService): HttpInterceptor => ({
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          const token = authService.getToken();

          // TODO whitelisting may need updating if using remote API
          if (startsWith(req.url[0], '/api') && token) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
          }

          return next.handle(req);
        },
      }),
      multi: true,
      deps: [AuthService],
    },
    {
      provide: StorageService,
      useClass: LocalStorageService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
