import { inject } from '@angular/core/testing';
import { TestBedHelper } from '../../../test/test-bed.helper';

import { ScrollingService } from './scrolling.service';

describe('PauseScrollingService', () => {
  const config = TestBedHelper.createComponentConfig()
    .addProviders(ScrollingService)
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  it('should be created', inject([ScrollingService], (service: ScrollingService) => {
    expect(service).toBeTruthy();
  }));
});
