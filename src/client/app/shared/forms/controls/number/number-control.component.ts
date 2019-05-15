import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlService } from '../../control.service';
import { GdbControlComponent } from '../../gdb-control.component';

@Component({
  selector: 'gdb-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.scss'],
  providers: [ControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberControlComponent extends GdbControlComponent<string> {
  @Input() min: number;
  @Input() max: number;

  constructor(protected controlService: ControlService) {
    super(controlService);
  }
}
