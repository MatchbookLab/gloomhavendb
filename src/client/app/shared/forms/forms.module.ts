import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlComponent } from './control/control.component';
import { FormComponent } from './form/form.component';

const toDeclareAndExport = [FormComponent, ControlComponent];

@NgModule({
  imports: [FormsModule],
  declarations: [...toDeclareAndExport],
  exports: [...toDeclareAndExport, FormsModule],
})
export class GdbFormsModule {}
