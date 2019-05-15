import { Component, Input } from '@angular/core';
import { Option } from '../../../../../../../shared/types/option';
import { GloomhavenIcon } from '../../../../icon/icon.enum';

@Component({
  selector: 'gdb-radio-option',
  templateUrl: './radio-option.component.html',
  styleUrls: ['./radio-option.component.scss'],
})
export class RadioOptionComponent implements Option {
  @Input() value: string;
  @Input() label: string;
  @Input() icon: GloomhavenIcon;
}
