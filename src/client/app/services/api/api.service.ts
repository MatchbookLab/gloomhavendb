import { BattleGoal } from '../../../../shared/types/entities/battle-goal';
import { Class } from '../../../../shared/types/entities/class';
import { EventCard } from '../../../../shared/types/entities/event';
import { Item } from '../../../../shared/types/entities/item';
import { MapLocation } from '../../../../shared/types/entities/map-location';
import { PersonalGoals } from '../../../../shared/types/entities/personal-goals';
import { RandomScenario } from '../../../../shared/types/entities/random-scenario';
import { Role } from '../../../../shared/types/entities/role';
import { Scenario } from '../../../../shared/types/entities/scenario';
import { SuggestedFix } from '../../../../shared/types/entities/suggested-fix';
import { User } from '../../../../shared/types/entities/user';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mapValues, omitBy, isNil } from 'lodash';

import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Login } from '../../../../shared/types/login';
import { NumberList } from '../../../../shared/types/number-list';
import { AuthResponse } from '../../../../shared/types/auth-response';

//////////////////////////////////////////
// This file is generated. Do not edit. //
//////////////////////////////////////////

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  //////////
  // Item //
  //////////

  async getItems(numbers?: NumberList): Promise<Item[]> {
    return this.httpClient
      .get<Item[]>(`/api/items`, { params: this.parametize({ numbers }) })
      .toPromise();
  }

  async findItem(number: string | number): Promise<Item> {
    return this.httpClient.get<Item>(`/api/items/${number}`).toPromise();
  }

  async createItem(item: Item): Promise<Item> {
    return this.httpClient.post<Item>(`/api/items`, item).toPromise();
  }

  async updateItem(cardNo: string | number, item: Item): Promise<Item> {
    return this.httpClient.put<Item>(`/api/items/${cardNo}`, item).toPromise();
  }

  async deleteItem(cardNo: string | number): Promise<Item> {
    return this.httpClient.delete<Item>(`/api/items/${cardNo}`).toPromise();
  }

  ///////////
  // Event //
  ///////////

  async getRoadEvents(): Promise<EventCard[]> {
    return this.httpClient.get<EventCard[]>(`/api/events/road`).toPromise();
  }

  async findRoadEvent(cardNo: string | number): Promise<EventCard> {
    return this.httpClient.get<EventCard>(`/api/events/road/${cardNo}`).toPromise();
  }

  async createRoadEvent(event: EventCard): Promise<EventCard> {
    return this.httpClient.post<EventCard>(`/api/events/road`, event).toPromise();
  }

  async updateRoadEvent(cardNo: string | number, event: EventCard): Promise<EventCard> {
    return this.httpClient.put<EventCard>(`/api/events/road/${cardNo}`, event).toPromise();
  }

  async deleteRoadEvent(cardNo: string | number): Promise<EventCard> {
    return this.httpClient.delete<EventCard>(`/api/events/road/${cardNo}`).toPromise();
  }

  async getCityEvents(): Promise<EventCard[]> {
    return this.httpClient.get<EventCard[]>(`/api/events/city`).toPromise();
  }

  async findCityEvent(cardNo: string | number): Promise<EventCard> {
    return this.httpClient.get<EventCard>(`/api/events/city/${cardNo}`).toPromise();
  }

  async createCityEvent(event: EventCard): Promise<EventCard> {
    return this.httpClient.post<EventCard>(`/api/events/city`, event).toPromise();
  }

  async updateCityEvent(cardNo: string | number, event: EventCard): Promise<EventCard> {
    return this.httpClient.put<EventCard>(`/api/events/city/${cardNo}`, event).toPromise();
  }

  async deleteCityEvent(cardNo: string | number): Promise<EventCard> {
    return this.httpClient.delete<EventCard>(`/api/events/city/${cardNo}`).toPromise();
  }

  ///////////////////
  // Suggested Fix //
  ///////////////////

  async suggestFix<T>(suggestedFix: SuggestedFix<T>): Promise<SuggestedFix<T>> {
    return this.httpClient.post<SuggestedFix<T>>(`/api/suggested-fix`, suggestedFix).toPromise();
  }

  async getMatchingSuggestedFixes<T>(type: SuggestedFixType, idOrNumber: string): Promise<SuggestedFix<T>[]> {
    return this.httpClient
      .get<SuggestedFix<T>[]>(`/api/suggested-fix/matching`, { params: this.parametize({ type, idOrNumber }) })
      .toPromise();
  }

  async commitFix<T>(payload: { id: string }): Promise<void> {
    return this.httpClient.post<void>(`/api/suggested-fix/commit`, payload).toPromise();
  }

  //////////////////
  // Map Location //
  //////////////////

  async getMapLocations(numbers?: NumberList): Promise<MapLocation[]> {
    return this.httpClient
      .get<MapLocation[]>(`/api/map-locations`, { params: this.parametize({ numbers }) })
      .toPromise();
  }

  async findMapLocation(number: string | number): Promise<MapLocation> {
    return this.httpClient.get<MapLocation>(`/api/map-locations/${number}`).toPromise();
  }

  /////////////////
  // Battle Goal //
  /////////////////

  async getBattleGoals(includeExtendedGoals?: boolean): Promise<BattleGoal[]> {
    return this.httpClient
      .get<BattleGoal[]>(`/api/battle-goals`, { params: this.parametize({ includeExtendedGoals }) })
      .toPromise();
  }

  async findBattleGoal(name: string): Promise<BattleGoal> {
    return this.httpClient.get<BattleGoal>(`/api/battle-goals/${name}`).toPromise();
  }

  ////////////////////
  // Authentication //
  ////////////////////

  async login(login: Login): Promise<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`/api/auth/login`, login).toPromise();
  }

  //////////
  // User //
  //////////

  async getUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>(`/api/users`).toPromise();
  }

  async findUser(id: string): Promise<User> {
    return this.httpClient.get<User>(`/api/users/${id}`).toPromise();
  }

  ////////////////////////////
  // Private Shared Methods //
  ////////////////////////////

  private parametize(paramMap: {
    [paramName: string]: boolean | number | NumberList;
  }): { [paramName: string]: string | string[] } {
    const stringifiedMap = mapValues(paramMap, (v) => (Array.isArray(v) ? v.map((av) => av + '') : v + ''));
    // remove undesirable values
    return omitBy(stringifiedMap, (v) => isNil(v) || v === 'undefined' || v === 'null' || v === '');
  }
}
