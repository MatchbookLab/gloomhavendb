import {
  AfterViewInit,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { forEach } from 'lodash';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { ControlService, ControlSharedConfig, ControlSharedConfigChanges, GdbControlInputs } from './control.service';

export interface GdbControl<T> extends FormControl {
  readonly statusChanges: Observable<any>; // TODO
  readonly value: T;
  readonly valueChanges: Observable<T>;

  // get<T2>(path: Array<string | number> | string): GdbControl<T2> | null;

  patchValue(
    value: T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    },
  ): void;
  patchValue(value: T, options?: Object): void;
  patchValue(
    value: T,
    options?:
      | { onlySelf?: boolean; emitEvent?: boolean; emitModelToViewChange?: boolean; emitViewToModelChange?: boolean }
      | Object,
  ): void;

  reset(formState?: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  reset(value?: T, options?: Object): void;
  reset(formState?: T, options?: { onlySelf?: boolean; emitEvent?: boolean } | Object): void;

  setValue(
    value: T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    },
  ): void;
  setValue(value: T, options?: Object): void;
  setValue(
    value: T,
    options?:
      | { onlySelf?: boolean; emitEvent?: boolean; emitModelToViewChange?: boolean; emitViewToModelChange?: boolean }
      | Object,
  ): void;
}

// TODO reuse somewhere
export type SimplerChanges<T> = SimpleChanges & { [K in keyof T]: SimplerChange<T[K]> };

export type SimplerChange<T> = {
  previousValue: T;
  currentValue: T;
  firstChange: boolean;
};

export abstract class GdbControlComponent<ControlModel, InternalModel = ControlModel>
  implements GdbControlInputs, ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  @ContentChild('readonly', { read: TemplateRef }) readonlyTemplate: TemplateRef<any>;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  propagateChange: (newVal: ControlModel) => void;
  propagateTouched: () => void;

  protected valueChanges$: Observable<InternalModel>;

  protected constructor(protected controlService: ControlService) {
    this.controlService.setNgControl(this);
  }

  get control(): GdbControl<InternalModel> {
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
      takeUntil(this.destroyed$),
    );

    this.valueChanges$ = this.control.valueChanges.pipe(
      distinctUntilChanged(),
      tap(val => this.controlService.configChanges.stringValue.next(this.getStringValue(val))),
      takeUntil(this.destroyed$),
    );

    this.valueChanges$.subscribe((val: InternalModel) => this.propagateChange(this.read(val)));
  }

  ngAfterViewInit() {
    this.controlService.readonlyTemplate = this.readonlyTemplate;
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
    return value ? value + '' : '';
  }
}
