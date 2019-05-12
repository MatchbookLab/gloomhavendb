import { EntityRepository } from 'typeorm';
import { EventEntity } from './event.entity';
import { BaseRepository } from '../base.repository';

@EntityRepository(EventEntity)
export class EventRepository extends BaseRepository<EventEntity> {}
