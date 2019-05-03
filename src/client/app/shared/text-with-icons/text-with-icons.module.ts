import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { TextWithIconsComponent } from './text-with-icons.component';

@NgModule({
  declarations: [TextWithIconsComponent],
  imports: [CommonModule, IconModule],
  exports: [TextWithIconsComponent],
})
export class TextWithIconsModule {}
