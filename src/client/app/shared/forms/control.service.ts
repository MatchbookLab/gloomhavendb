import { Injectable, Injector } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';

export interface ControlSharedConfig {
  label: string;
  required: boolean;
  readonly: boolean;
  stringValue: string;
}

export type ControlSharedConfigChanges = { [K in keyof ControlSharedConfig]: ReplaySubject<ControlSharedConfig[K]> };

// this should be injected directly into control components
@Injectable()
export class ControlService {
  control: FormControl = new FormControl();

  configChanges: ControlSharedConfigChanges = {
    label: new ReplaySubject<string>(),
    readonly: new ReplaySubject<boolean>(),
    required: new ReplaySubject<boolean>(),
    stringValue: new ReplaySubject<string>(),
  };

  private ngControl: NgControl;

  constructor(private injector: Injector) {
    this.ngControl = injector.get(NgControl);
  }

  setNgControl(component: ControlValueAccessor) {
    this.ngControl.valueAccessor = component;
  }
}
