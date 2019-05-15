import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { TextWithIconsModule } from '../text-with-icons/text-with-icons.module';
import { ControlWrapperComponent } from './control-wrapper/control-wrapper.component';
import { NumberControlComponent } from './controls/number/number-control.component';
import { RadioControlComponent } from './controls/radio/radio-control.component';
import { RadioOptionComponent } from './controls/radio/radio-option/radio-option.component';
import { TextControlComponent } from './controls/text/text-control.component';
import { FormComponent } from './form/form.component';

const toDeclareAndExport = [
  FormComponent,
  TextControlComponent,
  RadioControlComponent,
  RadioOptionComponent,
  NumberControlComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextWithIconsModule, IconModule],
  declarations: [...toDeclareAndExport, ControlWrapperComponent],
  exports: [...toDeclareAndExport, FormsModule, ReactiveFormsModule],
})
export class GdbFormsModule {}
