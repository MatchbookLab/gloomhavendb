import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../test/test-bed.helper';

import { ItemsComponent } from './items.component';
import { ItemsModule } from './items.module';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  const config = TestBedHelper.createComponentConfig()
    .addImports(ItemsModule)
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
