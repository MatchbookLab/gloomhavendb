import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GdbFormsModule } from '../../shared/forms/forms.module';

import { SecretEventsComponent } from './secret-events.component';

const routes: Routes = [
  {
    path: '',
    component: SecretEventsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretEventsRoutingModule {}

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, GdbFormsModule, SecretEventsRoutingModule, FontAwesomeModule],
  declarations: [SecretEventsComponent],
})
export class SecretEventsModule {}
