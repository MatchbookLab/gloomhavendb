import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BasicPopupComponent } from './basic/basic-popup.component';
import { PopupContainerComponent } from './container/popup-container.component';
import { PopupService } from './popup.service';

const exportedComponents = [PopupContainerComponent];
const entryComponents = [BasicPopupComponent];

@NgModule({
  imports: [OverlayModule],
  declarations: [...exportedComponents, ...entryComponents],
  providers: [PopupService],
  exports: exportedComponents,
  entryComponents: entryComponents,
})
export class PopupModule {}
