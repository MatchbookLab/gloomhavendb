import { Component, Inject, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { PlatformService } from '../services/platform/platform.service';

import { RoutePath } from '../util/routing';

@Component({
  selector: 'gdb-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  RoutePath = RoutePath;

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
