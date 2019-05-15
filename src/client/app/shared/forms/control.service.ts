import { Injectable, Injector, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { GdbControl } from './gdb-control.component';

export interface GdbControlInputs {
  label: string;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
}

export interface ControlSharedConfig extends GdbControlInputs {
  stringValue: string;
}

export type ControlSharedConfigChanges = { [K in keyof ControlSharedConfig]: ReplaySubject<ControlSharedConfig[K]> };

// this should be injected directly into control components
@Injectable()
export class ControlService {
  control: GdbControl<any> = new FormControl();

  configChanges: ControlSharedConfigChanges = {
    label: new ReplaySubject<string>(),
    readonly: new ReplaySubject<boolean>(),
    required: new ReplaySubject<boolean>(),
    disabled: new ReplaySubject<boolean>(),
    stringValue: new ReplaySubject<string>(),
  };

  readonlyTemplate: TemplateRef<any>;

  private ngControl: NgControl;

  constructor(private injector: Injector) {
    this.ngControl = injector.get(NgControl);
  }

  setNgControl(component: ControlValueAccessor) {
    this.ngControl.valueAccessor = component;
  }
}
