import { NgModule } from '@angular/core';
import { IconComponent } from './icon.component';

const declareAndExport = [IconComponent];

@NgModule({
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class IconModule {}
