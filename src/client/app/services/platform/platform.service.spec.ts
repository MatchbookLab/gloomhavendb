import { inject } from '@angular/core/testing';
import { TestBedHelper } from '../../../test/test-bed.helper';

import { PlatformService } from './platform.service';

describe('PlatformService', () => {
  const config = TestBedHelper.createComponentConfig()
    .addProviders(PlatformService)
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  it('should be created', inject([PlatformService], (service: PlatformService) => {
    expect(service).toBeTruthy();
  }));
});
