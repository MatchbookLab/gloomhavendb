import { EntityRepository } from 'typeorm';
import { ItemEntity } from './item.entity';
import { BaseRepository } from '../base.repository';

@EntityRepository(ItemEntity)
export class ItemRepository extends BaseRepository<ItemEntity> {}
