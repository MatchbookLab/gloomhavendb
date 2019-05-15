import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlService } from '../../control.service';
import { GdbControlComponent } from '../../gdb-control.component';

@Component({
  selector: 'gdb-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.scss'],
  providers: [ControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxControlComponent extends GdbControlComponent<boolean> {
  constructor(protected controlService: ControlService) {
    super(controlService);
  }
}
