import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../../shared/types/login';
import { AuthService } from '../services/auth/auth.service';
import { BaseRoutePath } from '../util/routing';

@Component({
  selector: 'gdb-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  error: string;

  credentials: Login = {};

  constructor(private authService: AuthService, private router: Router) {}

  async login(credentials: Login) {
    try {
      await this.authService.login(credentials);
      await this.router.navigate([BaseRoutePath.Home]);
    } catch (err) {
      this.error = err.message;
      console.error(err);
    }
  }
}
