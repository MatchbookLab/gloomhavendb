import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../../test/test-bed.helper';

import { SecretEventsComponent } from './secret-events.component';
import { SecretEventsModule } from './secret-events.module';

describe('SecretBattleGoalsComponent', () => {
  let component: SecretEventsComponent;
  let fixture: ComponentFixture<SecretEventsComponent>;

  const config = TestBedHelper.createComponentConfig().addImports(SecretEventsModule).getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
