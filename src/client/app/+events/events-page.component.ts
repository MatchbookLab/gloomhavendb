import { Component } from '@angular/core';
import { Event } from '../../../shared/types/entities/event';
import { ResolvedDataService } from '../services/resolver/resolve.service';

export interface EventsResolveData {
  events: Event[];
}

@Component({
  selector: 'gdb-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  providers: [ResolvedDataService],
})
export class EventsPageComponent {
  events: Event[];

  constructor(private resolvedDataService: ResolvedDataService<EventsResolveData>) {
    this.events = this.resolvedDataService.get('events');
  }
}
