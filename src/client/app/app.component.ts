import { Location, PopStateEvent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, NavigationEnd, NavigationStart, Router, UrlSegment } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { PlatformService } from './services/platform/platform.service';
import { RouteData } from './util/routing';

@Component({
  selector: 'gdb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private platform: PlatformService,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route: ActivatedRoute) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        mergeMap((route: ActivatedRoute) => route.data),
        map((data: RouteData) => (data && data.title ? `${data.title} | ` : '') + 'Gloomhaven DB'),
      )
      .subscribe((title: string) => this.titleService.setTitle(title));

    if (!this.platform.isBrowser) {
      return;
    }

    this.location.subscribe((event: PopStateEvent) => {
      this.lastPoppedUrl = event.url;
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
