import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { WipBannerComponent } from './wip-banner.component';

const declareAndExport = [WipBannerComponent];

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class WipBannerModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faExclamationTriangle);
    library.add(faTimes);
  }
}
