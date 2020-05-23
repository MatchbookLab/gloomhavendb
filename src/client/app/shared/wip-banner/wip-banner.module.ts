import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WipBannerComponent } from './wip-banner.component';

const declareAndExport = [WipBannerComponent];

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class WipBannerModule {}
