import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BattleGoal } from '../../../../../shared/entities/battle-goal';
import { TestBedHelper } from '../../../../test/test-bed.helper';
import { BattleGoalComponent } from './battle-goal.component';

import { SecretBattleGoalsModule } from '../secret-battle-goals.module';

describe('BattleGoalComponent', () => {
  let component: BattleGoalComponent;
  let fixture: ComponentFixture<BattleGoalComponent>;

  const config = TestBedHelper.createComponentConfig()
    .addImports(SecretBattleGoalsModule)
    .getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleGoalComponent);
    component = fixture.componentInstance;
    component.battleGoal = {
      id: 1,
      name: 'Acrobatic',
      isExtendedGoal: true,
      text: 'Lose a card to negate 5 or more damage.',
      checks: 1,
      imageUrl: '',
      verified: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
