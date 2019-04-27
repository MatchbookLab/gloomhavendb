import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../../test/test-bed.helper';

import { SecretMapComponent } from './secret-map.component';
import { SecretMapModule } from './secret-map.module';

describe('SecretMapComponent', () => {
  let component: SecretMapComponent;
  let fixture: ComponentFixture<SecretMapComponent>;

  const config = TestBedHelper.createComponentConfig()
    .addImports(SecretMapModule)
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
