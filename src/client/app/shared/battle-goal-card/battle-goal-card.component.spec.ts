import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from '../../../test/test-bed.helper';
import { BattleGoalCardComponent } from './battle-goal-card.component';
import { BattleGoalCardModule } from './battle-goal-card.module';

describe('BattleGoalCardComponent', () => {
  let component: BattleGoalCardComponent;
  let fixture: ComponentFixture<BattleGoalCardComponent>;

  const config = TestBedHelper.createComponentConfig().addImports(BattleGoalCardModule).getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleGoalCardComponent);
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
