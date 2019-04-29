import { Component, OnInit } from '@angular/core';
import { clone, random } from 'lodash';
import { battleGoals } from '../../../../data/battle-goals';
import { BattleGoal } from '../../../../shared/entities/battle-goal';

enum StoreKey {
  BattleGoalListKey = 'BATTLE_GOAL_LIST',
  PlayersBattleGoalsKey = 'PLAYER_BATTLE_GOALS',
}

@Component({
  selector: 'gdb-secret-battle-goals',
  templateUrl: './secret-battle-goals.component.html',
  styleUrls: ['./secret-battle-goals.component.scss'],
})
export class SecretBattleGoalsComponent implements OnInit {
  battleGoals: BattleGoal[];

  pickingBattleGoals: [BattleGoal?, BattleGoal?] = [];

  playersGoals: BattleGoal[] = [];
  peekedGoal: BattleGoal;
  canVeto: boolean;

  async ngOnInit() {
    this.battleGoals = this.load(StoreKey.BattleGoalListKey);
    if (!this.battleGoals) {
      this.resetBattleGoals();
    } else {
      this.playersGoals = this.load(StoreKey.PlayersBattleGoalsKey) || [];
    }
  }

  resetBattleGoals() {
    this.battleGoals = clone(battleGoals);
    this.playersGoals = [];
    this.pickingBattleGoals = [];
    this.peekedGoal = null;
    this.canVeto = null;
    this.clear(StoreKey.BattleGoalListKey);
    this.clear(StoreKey.PlayersBattleGoalsKey);
  }

  setupNewPlayer() {
    this.canVeto = true;
    this.pickingBattleGoals[0] = this.getRandomGoal();
    this.pickingBattleGoals[1] = this.getRandomGoal();

    this.store(StoreKey.BattleGoalListKey, this.battleGoals);
  }

  vetoGoal(index: number) {
    this.pickingBattleGoals[index] = this.getRandomGoal();
    this.canVeto = false;

    this.store(StoreKey.BattleGoalListKey, this.battleGoals);
  }

  selectBattleGoal(battleGoal: BattleGoal) {
    this.playersGoals.push(battleGoal);
    this.pickingBattleGoals = [];

    this.store(StoreKey.PlayersBattleGoalsKey, this.playersGoals);
  }

  showPlayerGoal(battleGoal: BattleGoal) {
    this.peekedGoal = battleGoal;
  }

  dismissPlayerGoal() {
    this.peekedGoal = null;
  }

  private getRandomGoal(): BattleGoal {
    const randomIndex: number = random(this.battleGoals.length - 1);
    return this.battleGoals.splice(randomIndex, 1)[0];
  }

  private store(key: StoreKey, goals: BattleGoal[]) {
    localStorage.setItem(key, JSON.stringify(goals));
  }

  private load(key: StoreKey): BattleGoal[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private clear(key: StoreKey) {
    localStorage.removeItem(key);
  }
}
