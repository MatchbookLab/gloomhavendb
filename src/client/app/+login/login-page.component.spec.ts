import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../test/test-bed.helper';

import { LoginPageComponent } from './login-page.component';
import { LoginPageModule } from './login-page.module';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  const config = TestBedHelper.createComponentConfig().addImports(LoginPageModule).getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
