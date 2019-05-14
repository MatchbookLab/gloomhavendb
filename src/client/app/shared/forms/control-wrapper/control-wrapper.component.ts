import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlService } from '../control.service';

@Component({
  selector: 'gdb-control-wrapper',
  templateUrl: './control-wrapper.component.html',
  styleUrls: ['./control-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlWrapperComponent {
  label$: Observable<string>;
  required$: Observable<boolean>;
  readonly$: Observable<boolean>;
  stringValue$: Observable<string>;

  constructor(protected controlService: ControlService) {
    this.label$ = controlService.configChanges.label;
    this.stringValue$ = controlService.configChanges.stringValue;
    this.required$ = controlService.configChanges.required;
    this.readonly$ = controlService.configChanges.readonly;
  }
}
