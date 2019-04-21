import { OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

export abstract class BaseControlValueAccessor<ControlModel = any, InternalModel = ControlModel>
  implements ControlValueAccessor, OnDestroy {
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  propagateChange = (newVal: ControlModel) => {};
  propagateTouched = () => {};

  ngOnDestroy() {
    this.destroyed$.next(false);
    this.destroyed$.complete();
  }

  abstract writeValue(value: ControlModel): void;

  registerOnChange(fn: (newVal: ControlModel) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.propagateTouched = fn;
  }
}
