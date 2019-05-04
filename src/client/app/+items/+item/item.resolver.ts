import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Item } from '../../../../shared/entities/item';
import { ApiService } from '../../services/api/api.service';

@Injectable()
export class ItemResolver implements Resolve<Item> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Item> {
    return this.api.findItem(route.paramMap.get('number'));
  }
}
