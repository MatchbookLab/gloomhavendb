import { Component, OnInit } from '@angular/core';
import { events } from '../../../../data/events';
import { EventType } from '../../../../shared/constants/event-type';
import { EventCard } from '../../../../shared/types/entities/event';

@Component({
  selector: 'gdb-secret-events',
  templateUrl: './secret-events.component.html',
  styleUrls: ['./secret-events.component.scss'],
})
export class SecretEventsComponent implements OnInit {
  selectedEvent: EventCard = <EventCard>{
    optionA: {},
    optionB: {},
  };

  EventType = EventType;

  async ngOnInit() {
    this.selectedEvent = events[1];
  }
}
