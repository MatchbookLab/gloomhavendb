import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
} from '@angular/core';
import { find } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Option } from '../../../../../../shared/types/option';
import { ControlService, GdbControlInputs } from '../../control.service';
import { GdbControlComponent, SimplerChanges } from '../../gdb-control.component';
import { RadioOptionComponent } from './radio-option/radio-option.component';

interface RadioControlInputs {
  inputOptions: Option[];
}

@Component({
  selector: 'gdb-radio-control',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.scss'],
  providers: [ControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioControlComponent extends GdbControlComponent<string>
  implements AfterViewInit, OnInit, OnChanges, RadioControlInputs {
  @Input('options') inputOptions: Option[] = [];
  @ContentChildren(RadioOptionComponent) viewOptions: QueryList<RadioOptionComponent>;

  options: Option[];
  selectedOption: Option;

  showOpts = false;

  constructor(protected controlService: ControlService, private cdr: ChangeDetectorRef) {
    super(controlService);
  }

  ngAfterViewInit() {
    this.viewOptions.changes.pipe(takeUntil(this.destroyed$)).subscribe(() => this.mergeOptions());

    this.showOpts = true;
    this.mergeOptions();

    super.ngAfterViewInit();
  }

  ngOnChanges(changes: SimplerChanges<GdbControlInputs & RadioControlInputs>) {
    if (changes.inputOptions) {
      this.mergeOptions();
    }
    super.ngOnChanges(changes);
  }

  ngOnInit() {
    super.ngOnInit();

    this.valueChanges$.subscribe((val: string) => {
      this.selectedOption = find(this.options, (opt: Option) => opt.value === val);
    });
  }

  trackByOptionValue(index: number, option: Option) {
    return option.value;
  }

  private mergeOptions() {
    if (!this.showOpts) {
      return;
    }

    this.options = [...this.inputOptions, ...this.viewOptions.toArray()];

    this.cdr.markForCheck();
  }
}
