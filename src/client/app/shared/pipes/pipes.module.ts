import { NgModule } from '@angular/core';
import { EnumToIconPipe } from './enum-to-icon/enum-to-icon.pipe';

const declareAndExport = [EnumToIconPipe];

@NgModule({
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class PipesModule {}
