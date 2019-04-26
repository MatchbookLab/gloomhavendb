import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus, faSearchMinus, faCheckCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

import { SecretMapComponent } from './secret-map.component';

const routes: Routes = [
  {
    path: '',
    component: SecretMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretMapRoutingModule {}

@NgModule({
  imports: [CommonModule, RouterModule, SecretMapRoutingModule, FontAwesomeModule],
  declarations: [SecretMapComponent],
})
export class SecretMapModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faSearchPlus);
    library.add(faSearchMinus);
    library.add(faCheckCircle);
  }
}
