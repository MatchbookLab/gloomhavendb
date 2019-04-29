import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { GdbFormsModule } from '../../shared/forms.module';

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
export class SecretEventsModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faPlus);
    library.add(faMinus);
  }
}
