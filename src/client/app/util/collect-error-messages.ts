import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

export interface ControlMap {
  [name: string]: AbstractControl;
}

export function collectErrorMessages(controls: ControlMap): string[] {
  return _.flatten(
    _.map(controls, (control: AbstractControl, name: string) => {
      return _.map(control.errors, (errData: any, errCode: string) => {
        const error = getErrorMessage(errCode, errData);

        return `${name} ${error}.`;
      });
    }),
  );
}

export function getErrorMessage(errCode: string, errData?: any): string {
  // This Control <message>.

  switch (errCode) {
    case 'required':
      return 'is a required field';
    case 'email':
      return 'is not a valid email address';
  }

  return 'has an error';
}
