import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlComponent } from './control/control.component';
import { FormComponent } from './form/form.component';

const toDeclareAndExport = [FormComponent, ControlComponent];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  declarations: [...toDeclareAndExport],
  exports: [...toDeclareAndExport],
})
export class GdbFormsModule {}
