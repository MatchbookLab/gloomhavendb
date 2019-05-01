import { NgModule } from '@angular/core';
import { FitTextDirective } from './fit-text.directive';

const declareAndExport = [FitTextDirective];

@NgModule({
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class FitTextModule {}
