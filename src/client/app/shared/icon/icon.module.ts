import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IconComponent } from './icon.component';

const declareAndExport = [IconComponent];

@NgModule({
  imports: [AngularSvgIconModule],
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class IconModule {}
