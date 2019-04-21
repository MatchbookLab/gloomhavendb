import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HomeModule } from './+home/home.module';
import { LoginModule } from './+login/login.module';
import { NotFoundModule } from './+not-found/not-found.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'gloomhavendb' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // no lazy loading for now
    HomeModule,
    LoginModule,
    NotFoundModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
