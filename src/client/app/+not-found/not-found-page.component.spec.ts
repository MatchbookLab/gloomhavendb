import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../test/test-bed.helper';

import { NotFoundPageComponent } from './not-found-page.component';
import { NotFoundPageModule } from './not-found-page.module';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;

  const config = TestBedHelper.createComponentConfig().addImports(NotFoundPageModule).getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
