import { BattleGoal } from '../../../../shared/entities/battle-goal';
import { Class } from '../../../../shared/entities/class';
import { Event } from '../../../../shared/entities/event';
import { Item } from '../../../../shared/entities/item';
import { MapLocation } from '../../../../shared/entities/map-location';
import { PersonalGoals } from '../../../../shared/entities/personal-goals';
import { RandomScenario } from '../../../../shared/entities/random-scenario';
import { Role } from '../../../../shared/entities/role';
import { Scenario } from '../../../../shared/entities/scenario';
import { SuggestedFix } from '../../../../shared/entities/suggested-fix';
import { User } from '../../../../shared/entities/user';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mapValues } from 'lodash';

import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';

//////////////////////////////////////////
// This file is generated. Do not edit. //
//////////////////////////////////////////

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  //////////
  // Item //
  //////////

  async getItems(numbers?: string | (string | number)[]): Promise<Item[]> {
    return this.httpClient.get<Item[]>(`/api/items`, { params: this.parametize({ numbers }) }).toPromise();
  }

  async findItem(id: string | number): Promise<Item> {
    return this.httpClient.get<Item>(`/api/items/${id}`).toPromise();
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

  async getRoadEvents(): Promise<Event[]> {
    return this.httpClient.get<Event[]>(`/api/events/road`).toPromise();
  }

  async findRoadEvent(cardNo: string | number): Promise<Event> {
    return this.httpClient.get<Event>(`/api/events/road/${cardNo}`).toPromise();
  }

  async createRoadEvent(event: Event): Promise<Event> {
    return this.httpClient.post<Event>(`/api/events/road`, event).toPromise();
  }

  async updateRoadEvent(cardNo: string | number, event: Event): Promise<Event> {
    return this.httpClient.put<Event>(`/api/events/road/${cardNo}`, event).toPromise();
  }

  async deleteRoadEvent(cardNo: string | number): Promise<Event> {
    return this.httpClient.delete<Event>(`/api/events/road/${cardNo}`).toPromise();
  }

  async getCityEvents(): Promise<(Event)[]> {
    return this.httpClient.get<(Event)[]>(`/api/events/city`).toPromise();
  }

  async findCityEvent(cardNo: string | number): Promise<Event> {
    return this.httpClient.get<Event>(`/api/events/city/${cardNo}`).toPromise();
  }

  async createCityEvent(event: Event): Promise<Event> {
    return this.httpClient.post<Event>(`/api/events/city`, event).toPromise();
  }

  async updateCityEvent(cardNo: string | number, event: Event): Promise<Event> {
    return this.httpClient.put<Event>(`/api/events/city/${cardNo}`, event).toPromise();
  }

  async deleteCityEvent(cardNo: string | number): Promise<Event> {
    return this.httpClient.delete<Event>(`/api/events/city/${cardNo}`).toPromise();
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

  private parametize(paramMap: {
    [paramName: string]: string | number | (string | number)[];
  }): { [paramName: string]: string | string[] } {
    return mapValues(paramMap, v => (Array.isArray(v) ? v.map(av => av + '') : v + ''));
  }
}
