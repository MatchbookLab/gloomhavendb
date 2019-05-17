import { Component } from '@angular/core';

@Component({
  selector: 'gdb-form',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FormComponent {}
