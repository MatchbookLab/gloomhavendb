import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GdbFormsModule } from '../shared/forms/forms.module';

import { LoginPageComponent } from './login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}

@NgModule({
  imports: [CommonModule, GdbFormsModule, LoginPageRoutingModule],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
