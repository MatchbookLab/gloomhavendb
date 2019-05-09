import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WipBannerModule } from '../shared/wip-banner/wip-banner.module';

import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

@NgModule({
  imports: [CommonModule, HomePageRoutingModule, WipBannerModule],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
