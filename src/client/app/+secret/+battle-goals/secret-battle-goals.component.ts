import { Component, OnInit } from '@angular/core';
import { clone, random } from 'lodash';
import { BattleGoal } from '../../../../shared/entities/battle-goal';
import { ApiService } from '../../services/api/api.service';
import { ScrollingService } from '../../services/scrolling/scrolling.service';

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

  constructor(private scrollingService: ScrollingService, private api: ApiService) {}

  async ngOnInit() {
    this.battleGoals = this.load(StoreKey.BattleGoalListKey);
    if (!this.battleGoals) {
      await this.resetBattleGoals();
    } else {
      this.playersGoals = this.load(StoreKey.PlayersBattleGoalsKey) || [];
    }
  }

  async resetBattleGoals() {
    this.battleGoals = clone(await this.api.getBattleGoals(true));
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
    this.scrollingService.lock();
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
    this.scrollingService.unlock();
  }

  showPlayerGoal(battleGoal: BattleGoal) {
    this.peekedGoal = battleGoal;
    this.scrollingService.lock();
  }

  dismissPlayerGoal() {
    this.peekedGoal = null;
    this.scrollingService.unlock();
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
