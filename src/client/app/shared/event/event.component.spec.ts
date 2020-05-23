import { ComponentFixture, TestBed } from '@angular/core/testing';
import { events } from '../../../../data/events';
import { TestBedHelper } from '../../../test/test-bed.helper';
import { EventComponent } from './event.component';
import { EventModule } from './event.module';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  const config = TestBedHelper.createComponentConfig().addImports(EventModule).getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;

    component.event = events[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
