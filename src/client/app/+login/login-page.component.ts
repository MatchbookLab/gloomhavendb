import { Component } from '@angular/core';
import { Login } from '../../../shared/types/login';

@Component({
  selector: 'gdb-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  lastResult: any;

  credentials: Login = {};

  constructor() {}

  async login() {
    try {
      console.log(this.credentials);
      throw new Error('Not Yet Implemented');
    } catch (err) {
      this.lastResult = err.message;
    }
  }
}
