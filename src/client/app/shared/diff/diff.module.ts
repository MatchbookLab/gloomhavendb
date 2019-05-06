import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiffComponent } from './diff.component';

const declareAndExport = [DiffComponent];

@NgModule({
  imports: [CommonModule],
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class DiffModule {}
