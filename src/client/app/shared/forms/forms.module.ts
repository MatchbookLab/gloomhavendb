import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextWithIconsModule } from '../text-with-icons/text-with-icons.module';
import { ControlWrapperComponent } from './control-wrapper/control-wrapper.component';
import { FormComponent } from './form/form.component';
import { TextControlComponent } from './controls/text/text-control.component';

const toDeclareAndExport = [FormComponent, TextControlComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextWithIconsModule],
  declarations: [...toDeclareAndExport, ControlWrapperComponent],
  exports: [...toDeclareAndExport, FormsModule, ReactiveFormsModule],
})
export class GdbFormsModule {}
