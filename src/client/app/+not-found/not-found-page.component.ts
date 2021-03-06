import { Component, Inject, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { PlatformService } from '../services/platform/platform.service';

import { BaseRoutePath } from '../util/routing';

@Component({
  selector: 'gdb-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  RoutePath = BaseRoutePath;

  constructor(
    platform: PlatformService,
    @Optional()
    @Inject(RESPONSE)
    res: Response,
  ) {
    // `res` is the express response, only available on the server
    if (platform.isServer) {
      res.status(404);
    }
  }
}
