import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { events } from '../../../../data/events';
import { TestBedHelper } from '../../../test/test-bed.helper';
import { ApiService } from '../../services/api/api.service';

import { EventPageComponent, EventResolveData } from './event-page.component';
import { EventPageModule } from './event-page.module';

describe('EventPageComponent', () => {
  let component: EventPageComponent;
  let fixture: ComponentFixture<EventPageComponent>;

  const config = TestBedHelper.createComponentConfig()
    .addImports(EventPageModule, RouterTestingModule)
    .addProviders([
      {
        provide: ApiService,
        useValue: {},
      },
      TestBedHelper.mockRouteData<EventResolveData>({
        event: events[0],
        suggestedFixes: [],
      }),
    ])
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
