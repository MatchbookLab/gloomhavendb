import { Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { forEach } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { ControlService, ControlSharedConfig, ControlSharedConfigChanges, GdbControlInputs } from './control.service';

// TODO reuse somewhere
export type SimplerChanges<T> = SimpleChanges & { [K in keyof T]: SimplerChange<T[K]> };

export type SimplerChange<T> = {
  previousValue: T;
  currentValue: T;
  firstChange: boolean;
};

export abstract class GdbControl<ControlModel, InternalModel = ControlModel>
  implements GdbControlInputs, ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  propagateChange: (newVal: ControlModel) => void;
  propagateTouched: () => void;

  protected constructor(protected controlService: ControlService) {
    this.controlService.setNgControl(this);
  }

  get control(): FormControl {
    return this.controlService.control;
  }

  ngOnChanges(changes: SimplerChanges<GdbControlInputs>) {
    forEach<ControlSharedConfigChanges>(
      this.controlService.configChanges,
      <K extends keyof ControlSharedConfigChanges>(subj: ReplaySubject<ControlSharedConfig[K]>, key: K) => {
        if (changes[key]) {
          subj.next(changes[key].currentValue);
        }
      },
    );
  }

  ngOnInit() {
    this.control.statusChanges.pipe(
      distinctUntilChanged(),
      tap(val => console.log('statusChanges', val)),
    );

    this.control.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(val => this.controlService.configChanges.stringValue.next(this.getStringValue(val))),
        takeUntil(this.destroyed$),
      )
      .subscribe((val: InternalModel) => this.propagateChange(this.read(val)));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /** @private */
  writeValue(value: ControlModel): void {
    this.control.setValue(this.write(value));
  }

  registerOnChange(fn: (newVal: ControlModel) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.propagateTouched = fn;
  }

  protected write(value: ControlModel): InternalModel {
    return <InternalModel>(<unknown>value);
  }

  protected read(value: InternalModel): ControlModel {
    return <ControlModel>(<unknown>value);
  }

  protected getStringValue(value: InternalModel): string {
    return <string>(<unknown>value);
  }
}
