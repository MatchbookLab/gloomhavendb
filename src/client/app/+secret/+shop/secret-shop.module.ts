import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { SecretShopComponent } from './secret-shop.component';

const routes: Routes = [
  {
    path: '',
    component: SecretShopComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretShopRoutingModule {}

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, SecretShopRoutingModule, FontAwesomeModule],
  declarations: [SecretShopComponent],
})
export class SecretShopModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faSearch);
  }
}
