import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GdbFormsModule } from '../forms/forms.module';
import { IconModule } from '../icon/icon.module';
import { PipesModule } from '../pipes/pipes.module';
import { PopupModule } from '../popup/popup.module';
import { TextWithIconsModule } from '../text-with-icons/text-with-icons.module';
import { EventComponent } from './event.component';

const declareAndExport = [EventComponent];

@NgModule({
  imports: [CommonModule, PipesModule, IconModule, GdbFormsModule, TextWithIconsModule, PopupModule],
  declarations: declareAndExport,
  exports: declareAndExport,
})
export class EventModule {}
