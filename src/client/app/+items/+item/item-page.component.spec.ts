import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemSource } from '../../../../shared/constants/item-source';
import { Limit } from '../../../../shared/constants/limit';
import { Slot } from '../../../../shared/constants/slot';
import { TestBedHelper } from '../../../test/test-bed.helper';
import { ApiService } from '../../services/api/api.service';

import { ItemPageComponent, ItemResolveData } from './item-page.component';
import { ItemPageModule } from './item-page.module';

describe('ItemPageComponent', () => {
  let component: ItemPageComponent;
  let fixture: ComponentFixture<ItemPageComponent>;

  const config = TestBedHelper.createComponentConfig()
    .addImports(ItemPageModule, RouterTestingModule)
    .addProviders([
      {
        provide: ApiService,
        useValue: {},
      },
      TestBedHelper.mockRouteData<ItemResolveData>({
        item: {
          number: 1,
          name: 'Boots of Striding',
          slot: Slot.Legs,
          price: 20,
          text: 'During your movement, add +2 Move to the movement.',
          count: 2,
          limit: Limit.Spent,
          uses: null,
          negativeCardsCount: null,
          sourceType: ItemSource.Prosperity,
          sourceId: 1,
          imageUrl: '/assets/cards/items/1-14/boots-of-striding.png',
          verified: false,
        },
        suggestedFixes: [],
      }),
    ])
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
