import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GdbControl } from '../gdb-control.class';
import { ControlService } from '../control.service';

@Component({
  selector: 'gdb-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss'],
  providers: [ControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlComponent extends GdbControl<string> {
  constructor(protected controlService: ControlService) {
    super(controlService);
  }
}
