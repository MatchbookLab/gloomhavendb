import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemSource } from '../../../../shared/constants/item-source';
import { Limit } from '../../../../shared/constants/limit';
import { Slot } from '../../../../shared/constants/slot';
import { TestBedHelper } from '../../../test/test-bed.helper';
import { ApiService } from '../../services/api/api.service';

import { ItemComponent } from './item.component';
import { ItemModule } from './item.module';

describe('ItemsComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  const config = TestBedHelper.createComponentConfig()
    .addImports(ItemModule, RouterTestingModule)
    .addProviders([
      {
        provide: ApiService,
        useValue: {},
      },
    ])
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    component.item = {
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
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
