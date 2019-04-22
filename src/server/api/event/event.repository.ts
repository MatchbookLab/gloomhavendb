import { EntityRepository } from 'typeorm';
import { Event } from '../../../shared/entities/event';
import { BaseRepository } from '../base.repository';

@EntityRepository(Event)
export class EventRepository extends BaseRepository<Event> {}
