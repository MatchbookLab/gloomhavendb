import { Component } from '@angular/core';
import { Login } from '../../../shared/types/login';

@Component({
  selector: 'gdb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
