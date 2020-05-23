import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../../test/test-bed.helper';

import { SecretBattleGoalsComponent } from './secret-battle-goals.component';
import { SecretBattleGoalsModule } from './secret-battle-goals.module';

describe('SecretBattleGoalsComponent', () => {
  let component: SecretBattleGoalsComponent;
  let fixture: ComponentFixture<SecretBattleGoalsComponent>;

  const config = TestBedHelper.createComponentConfig().addImports(SecretBattleGoalsModule).getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretBattleGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
