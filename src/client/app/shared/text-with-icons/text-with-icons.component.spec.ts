import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../../test/test-bed.helper';

import { TextWithIconsComponent } from './text-with-icons.component';
import { TextWithIconsModule } from './text-with-icons.module';

describe('TextWithIconsComponent', () => {
  let component: TextWithIconsComponent;
  let fixture: ComponentFixture<TextWithIconsComponent>;

  const config = TestBedHelper.createComponentConfig().addImports(TextWithIconsModule).getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
