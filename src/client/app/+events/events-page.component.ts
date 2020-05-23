import { Component } from '@angular/core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from '../../../shared/types/entities/event';
import { ResolvedDataService } from '../services/resolver/resolve.service';

export interface EventsResolveData {
  events: EventCard[];
}

@Component({
  selector: 'gdb-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  providers: [ResolvedDataService],
})
export class EventsPageComponent {
  backIcon = faArrowCircleLeft;

  events: EventCard[];

  constructor(private resolvedDataService: ResolvedDataService<EventsResolveData>) {
    this.events = this.resolvedDataService.get('events');
  }
}
