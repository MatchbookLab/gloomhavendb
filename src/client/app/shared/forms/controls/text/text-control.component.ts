import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlService } from '../../control.service';
import { GdbControlComponent } from '../../gdb-control.component';

@Component({
  selector: 'gdb-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss'],
  providers: [ControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlComponent extends GdbControlComponent<string> {
  @Input() rows: number; // only for textarea
  @Input() type: 'password' | 'text' | 'email' | 'textarea' = 'text';
  @Input() preview: boolean;

  constructor(protected controlService: ControlService) {
    super(controlService);
  }
}
