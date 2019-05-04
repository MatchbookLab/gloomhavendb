import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Axios from 'axios';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/api/http.service';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'gloomhavendb' }),
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
      provide: HttpService,
      useValue: Axios.create({ baseURL: '/', headers: { 'Content-Type': 'application/json' } }),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
