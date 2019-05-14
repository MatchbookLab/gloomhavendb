import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlWrapperComponent } from './control-wrapper/control-wrapper.component';
import { TextControlComponent } from './text/text-control.component';
import { FormComponent } from './form/form.component';

const toDeclareAndExport = [FormComponent, TextControlComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...toDeclareAndExport, ControlWrapperComponent],
  exports: [...toDeclareAndExport, FormsModule, ReactiveFormsModule],
})
export class GdbFormsModule {}
