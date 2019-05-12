import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../test/test-bed.helper';

import { EventsPageComponent } from './events-page.component';
import { EventsPageModule } from './events-page.module';

describe('EventsPageComponent', () => {
  let component: EventsPageComponent;
  let fixture: ComponentFixture<EventsPageComponent>;

  const config = TestBedHelper.createComponentConfig()
    .addImports(EventsPageModule)
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
