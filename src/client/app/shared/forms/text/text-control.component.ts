import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlService } from '../control.service';
import { GdbControl } from '../gdb-control.class';

@Component({
  selector: 'gdb-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss'],
  providers: [ControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlComponent extends GdbControl<string> {
  @Input() type: 'password' | 'text' | 'email' = 'text';

  constructor(protected controlService: ControlService) {
    super(controlService);
  }
}
