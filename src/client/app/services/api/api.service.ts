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
import { HttpService } from './http.service';

//////////////////////////////////////////
// This file is generated. Do not edit. //
//////////////////////////////////////////

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpService) {}

  //////////
  // Item //
  //////////

  async getItems(numbers?: string | (string | number)[]): Promise<Item[]> {
    return (await this.http.get(`/api/items`, { params: { numbers } })).data;
  }

  async findItem(id: string | number): Promise<Item> {
    return (await this.http.get(`/api/items/${id}`)).data;
  }

  async createItem(item: Item): Promise<Item> {
    return (await this.http.post(`/api/items`, item)).data;
  }

  async updateItem(cardNo: string | number, item: Item): Promise<Item> {
    return (await this.http.put(`/api/items/${cardNo}`, item)).data;
  }

  async deleteItem(cardNo: string | number): Promise<Item> {
    return (await this.http.delete(`/api/items/${cardNo}`)).data;
  }

  ///////////
  // Event //
  ///////////

  async getRoadEvents(): Promise<Event[]> {
    return (await this.http.get(`/api/events/road`)).data;
  }

  async findRoadEvent(cardNo: string | number): Promise<Event> {
    return (await this.http.get(`/api/events/road/${cardNo}`)).data;
  }

  async createRoadEvent(event: Event): Promise<Event> {
    return (await this.http.post(`/api/events/road`, event)).data;
  }

  async updateRoadEvent(cardNo: string | number, event: Event): Promise<Event> {
    return (await this.http.put(`/api/events/road/${cardNo}`, event)).data;
  }

  async deleteRoadEvent(cardNo: string | number): Promise<Event> {
    return (await this.http.delete(`/api/events/road/${cardNo}`)).data;
  }

  async getCityEvents(): Promise<(Event)[]> {
    return (await this.http.get(`/api/events/city`)).data;
  }

  async findCityEvent(cardNo: string | number): Promise<Event> {
    return (await this.http.get(`/api/events/city/${cardNo}`)).data;
  }

  async createCityEvent(event: Event): Promise<Event> {
    return (await this.http.post(`/api/events/city`, event)).data;
  }

  async updateCityEvent(cardNo: string | number, event: Event): Promise<Event> {
    return (await this.http.put(`/api/events/city/${cardNo}`, event)).data;
  }

  async deleteCityEvent(cardNo: string | number): Promise<Event> {
    return (await this.http.delete(`/api/events/city/${cardNo}`)).data;
  }

  ///////////////////
  // Suggested Fix //
  ///////////////////

  async suggestFix<T>(suggestedFix: SuggestedFix<T>): Promise<SuggestedFix<T>> {
    return (await this.http.post(`/api/suggested-fix`, suggestedFix)).data;
  }
}
