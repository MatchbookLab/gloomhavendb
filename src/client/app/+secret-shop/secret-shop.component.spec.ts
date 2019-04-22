import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../test/test-bed.helper';

import { SecretShopComponent } from './secret-shop.component';
import { SecretShopModule } from './secret-shop.module';

describe('SecretShopComponent', () => {
  let component: SecretShopComponent;
  let fixture: ComponentFixture<SecretShopComponent>;

  const config = TestBedHelper.createComponentConfig()
    .addImports(SecretShopModule)
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
