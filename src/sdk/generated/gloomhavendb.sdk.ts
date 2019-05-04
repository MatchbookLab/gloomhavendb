import { BattleGoal } from '../../shared/entities/battle-goal';
import { Class } from '../../shared/entities/class';
import { Event } from '../../shared/entities/event';
import { Item } from '../../shared/entities/item';
import { MapLocation } from '../../shared/entities/map-location';
import { PersonalGoals } from '../../shared/entities/personal-goals';
import { RandomScenario } from '../../shared/entities/random-scenario';
import { Role } from '../../shared/entities/role';
import { Scenario } from '../../shared/entities/scenario';
import { SuggestedFix } from '../../shared/entities/suggested-fix';
import { User } from '../../shared/entities/user';

export class GloomhavenDB {
  constructor(private baseUrl = 'https://gloomhavendb.com') {}

  private queryStringize(queryParamName: string, data: string | (string | number)[]): string {
    if (!data || !data.length) {
      return '';
    }

    if (typeof data === 'string') {
      return `${queryParamName}=${data}`;
    }

    if (Array.isArray(data)) {
      return data.map(d => `${queryParamName}[]=${d}`).join('&');
    }

    // TODO better error message?
    throw new Error('Cannot turn data into query string');
  }

  //////////
  // Item //
  //////////

  async getItems(numbers?: string | (string | number)[]): Promise<Item[]> {
    const queryParts: string[] = [];
    queryParts.push(this.queryStringize('numbers', numbers));
    return (await fetch(`${this.baseUrl}/api/items?${queryParts.join('&')}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async findItem(id: string | number): Promise<Item> {
    return (await fetch(`${this.baseUrl}/api/items/${id}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async createItem(item: Item): Promise<Item> {
    return (await fetch(`${this.baseUrl}/api/items`, {
      method: 'post',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async updateItem(cardNo: string | number, item: Item): Promise<Item> {
    return (await fetch(`${this.baseUrl}/api/items/${cardNo}`, {
      method: 'put',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async deleteItem(cardNo: string | number): Promise<Item> {
    return (await fetch(`${this.baseUrl}/api/items/${cardNo}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  ///////////
  // Event //
  ///////////

  async getRoadEvents(): Promise<Event[]> {
    return (await fetch(`${this.baseUrl}/api/events/road`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async findRoadEvent(cardNo: string | number): Promise<Event> {
    return (await fetch(`${this.baseUrl}/api/events/road/${cardNo}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async createRoadEvent(event: Event): Promise<Event> {
    return (await fetch(`${this.baseUrl}/api/events/road`, {
      method: 'post',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async updateRoadEvent(cardNo: string | number, event: Event): Promise<Event> {
    return (await fetch(`${this.baseUrl}/api/events/road/${cardNo}`, {
      method: 'put',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async deleteRoadEvent(cardNo: string | number): Promise<Event> {
    return (await fetch(`${this.baseUrl}/api/events/road/${cardNo}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async getCityEvents(): Promise<(Event)[]> {
    return (await fetch(`${this.baseUrl}/api/events/city`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async findCityEvent(cardNo: string | number): Promise<Event> {
    return (await fetch(`${this.baseUrl}/api/events/city/${cardNo}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async createCityEvent(event: Event): Promise<Event> {
    return (await fetch(`${this.baseUrl}/api/events/city`, {
      method: 'post',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async updateCityEvent(cardNo: string | number, event: Event): Promise<Event> {
    return (await fetch(`${this.baseUrl}/api/events/city/${cardNo}`, {
      method: 'put',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async deleteCityEvent(cardNo: string | number): Promise<Event> {
    return (await fetch(`${this.baseUrl}/api/events/city/${cardNo}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }
}
