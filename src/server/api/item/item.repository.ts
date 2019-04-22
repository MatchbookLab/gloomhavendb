import { EntityRepository } from 'typeorm';
import { Item } from '../../../shared/entities/item';
import { BaseRepository } from '../base.repository';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {}
