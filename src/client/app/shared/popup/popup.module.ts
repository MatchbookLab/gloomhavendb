import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { BasicPopupComponent } from './basic/basic-popup.component';
import { PopupContainerComponent } from './container/popup-container.component';
import { IconListPopup } from './icon-list/icon-list-popup.component';
import { PopupService } from './popup.service';

const exportedComponents = [PopupContainerComponent];
const entryComponents = [BasicPopupComponent, IconListPopup];

@NgModule({
  imports: [CommonModule, OverlayModule, IconModule],
  declarations: [...exportedComponents, ...entryComponents],
  providers: [PopupService],
  exports: exportedComponents,
  entryComponents: entryComponents,
})
export class PopupModule {}
