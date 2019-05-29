import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Event } from '../../../shared/types/entities/event';
import { ApiService } from '../services/api/api.service';
import { ROUTE_TITLE_PLACEHOLDER } from '../services/meta-tags/meta-tags.service';
import { ResolveService, RouteResolvers } from '../services/resolver/resolve.service';
import { WipBannerModule } from '../shared/wip-banner/wip-banner.module';
import { BetterRoute } from '../util/routing';

import { EventsPageComponent, EventsResolveData } from './events-page.component';

export enum EventRoutes {
  Events = '',
  Event = ':type/:number',
}

const resolveRouteData: RouteResolvers<EventsResolveData> = {
  events: 'EventsResolver',
};

const routes: BetterRoute<EventRoutes>[] = [
  {
    path: EventRoutes.Events,
    component: EventsPageComponent,
    data: {
      title: 'Events',
    },
    resolve: resolveRouteData,
  },
  {
    path: EventRoutes.Event,
    loadChildren: () => import('./+event/event-page.module').then(m => m.EventPageModule),
    runGuardsAndResolvers: 'always',
    data: {
      title: ROUTE_TITLE_PLACEHOLDER,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: resolveRouteData.events,
      useFactory: (resolveService: ResolveService) =>
        resolveService.factoryResolver({
          getStateId: (): string => 'events',
          getFreshData: async (api: ApiService): Promise<Event[]> => {
            const [cityEvents, roadEvents] = await Promise.all([api.getCityEvents(), api.getRoadEvents()]);

            return [...cityEvents, ...roadEvents];
          },
        }),
      deps: [ResolveService],
    },
  ],
})
export class EventsPageRouterModule {}

@NgModule({
  imports: [CommonModule, EventsPageRouterModule, FontAwesomeModule, WipBannerModule],
  declarations: [EventsPageComponent],
})
export class EventsPageModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faArrowCircleLeft);
  }
}
