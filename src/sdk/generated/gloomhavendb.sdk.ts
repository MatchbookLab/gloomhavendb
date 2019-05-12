import { BattleGoalEntity } from '../../server/api/battle-goal/battle-goal.entity';
import { ClassEntity } from '../../server/api/class/class.entity';
import { EventEntity } from '../../server/api/event/event.entity';
import { ItemEntity } from '../../server/api/item/item.entity';
import { MapLocationEntity } from '../../server/api/map-location/map-location.entity';
import { PersonalGoalsEntity } from '../../server/api/personal-goal/personal-goals.entity';
import { RandomScenarioEntity } from '../../server/api/random-scenario/random-scenario.entity';
import { RoleEntity } from '../../server/api/role/role.entity';
import { ScenarioEntity } from '../../server/api/scenario/scenario.entity';
import { SuggestedFixEntity } from '../../server/api/suggested-fix/suggested-fix.entity';
import { UserEntity } from '../../server/api/user/user.entity';

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

  async getItems(numbers?: string | (string | number)[]): Promise<ItemEntity[]> {
    const queryParts: string[] = [];
    queryParts.push(this.queryStringize('numbers', numbers));
    return (await fetch(`${this.baseUrl}/api/items?${queryParts.join('&')}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async findItem(id: string | number): Promise<ItemEntity> {
    return (await fetch(`${this.baseUrl}/api/items/${id}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async createItem(item: ItemEntity): Promise<ItemEntity> {
    return (await fetch(`${this.baseUrl}/api/items`, {
      method: 'post',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async updateItem(cardNo: string | number, item: ItemEntity): Promise<ItemEntity> {
    return (await fetch(`${this.baseUrl}/api/items/${cardNo}`, {
      method: 'put',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async deleteItem(cardNo: string | number): Promise<ItemEntity> {
    return (await fetch(`${this.baseUrl}/api/items/${cardNo}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  ///////////
  // Event //
  ///////////

  async getRoadEvents(): Promise<EventEntity[]> {
    return (await fetch(`${this.baseUrl}/api/events/road`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async findRoadEvent(cardNo: string | number): Promise<EventEntity> {
    return (await fetch(`${this.baseUrl}/api/events/road/${cardNo}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async createRoadEvent(event: EventEntity): Promise<EventEntity> {
    return (await fetch(`${this.baseUrl}/api/events/road`, {
      method: 'post',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async updateRoadEvent(cardNo: string | number, event: EventEntity): Promise<EventEntity> {
    return (await fetch(`${this.baseUrl}/api/events/road/${cardNo}`, {
      method: 'put',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async deleteRoadEvent(cardNo: string | number): Promise<EventEntity> {
    return (await fetch(`${this.baseUrl}/api/events/road/${cardNo}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async getCityEvents(): Promise<(EventEntity)[]> {
    return (await fetch(`${this.baseUrl}/api/events/city`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async findCityEvent(cardNo: string | number): Promise<EventEntity> {
    return (await fetch(`${this.baseUrl}/api/events/city/${cardNo}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async createCityEvent(event: EventEntity): Promise<EventEntity> {
    return (await fetch(`${this.baseUrl}/api/events/city`, {
      method: 'post',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async updateCityEvent(cardNo: string | number, event: EventEntity): Promise<EventEntity> {
    return (await fetch(`${this.baseUrl}/api/events/city/${cardNo}`, {
      method: 'put',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }

  async deleteCityEvent(cardNo: string | number): Promise<EventEntity> {
    return (await fetch(`${this.baseUrl}/api/events/city/${cardNo}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }
}
