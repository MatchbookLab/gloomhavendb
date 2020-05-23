import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventType } from '../../../../shared/constants/event-type';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { EventCard } from '../../../../shared/types/entities/event';
import { SuggestedFix } from '../../../../shared/types/entities/suggested-fix';
import { ApiService } from '../../services/api/api.service';
import { ResolveService, RouteResolvers } from '../../services/resolver/resolve.service';
import { DiffModule } from '../../shared/diff/diff.module';
import { EventModule } from '../../shared/event/event.module';
import { IconModule } from '../../shared/icon/icon.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { PopupModule } from '../../shared/popup/popup.module';
import { TextWithIconsModule } from '../../shared/text-with-icons/text-with-icons.module';
import { WipBannerModule } from '../../shared/wip-banner/wip-banner.module';

import { EventPageComponent, EventResolveData } from './event-page.component';

const resolveRouteData: RouteResolvers<EventResolveData> = {
  event: 'EventResolver',
  suggestedFixes: 'SuggestedFixesResolver',
};

const routes: Routes = [
  {
    path: '',
    component: EventPageComponent,
    resolve: resolveRouteData,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: resolveRouteData.suggestedFixes,
      // exceptions for how city events share a page template
      useFactory: (resolveService: ResolveService) =>
        resolveService.factoryResolver({
          getStateId: (route: ActivatedRouteSnapshot) =>
            `suggested-fixes/events/${route.params['type']}/${route.params['number']}`,
          getFreshData: (api: ApiService, route?: ActivatedRouteSnapshot): Promise<SuggestedFix<EventCard>[]> =>
            api.getMatchingSuggestedFixes<EventCard>(
              route.params['type'] === (<string>EventType.City).toLowerCase()
                ? SuggestedFixType.CityEvent
                : SuggestedFixType.RoadEvent,
              route.params['number'],
            ),
        }),
      deps: [ResolveService],
    },
    {
      provide: resolveRouteData.event,
      useFactory: (resolveService: ResolveService) =>
        resolveService.factoryResolver({
          getStateId: (route?: ActivatedRouteSnapshot): string =>
            'event-' + route.params['type'] + route.params['number'],
          getFreshData: (api: ApiService, route?: ActivatedRouteSnapshot): Promise<EventCard> =>
            route.params['type'] === (<string>EventType.City).toLowerCase()
              ? api.findCityEvent(route.params['number'])
              : api.findRoadEvent(route.params['number']),
        }),
      deps: [ResolveService],
    },
  ],
})
export class EventPageRouterModule {}

@NgModule({
  imports: [
    CommonModule,
    PopupModule,
    EventPageRouterModule,
    EventModule,
    IconModule,
    PipesModule,
    FormsModule,
    TextWithIconsModule,
    DiffModule,
    FontAwesomeModule,
    WipBannerModule,
  ],
  declarations: [EventPageComponent],
})
export class EventPageModule {}
