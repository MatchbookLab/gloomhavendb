import { EntityRepository } from 'typeorm';
import { SuggestedFixEntity } from './suggested-fix.entity';
import { BaseRepository } from '../base.repository';

@EntityRepository(SuggestedFixEntity)
export class SuggestedFixRepository extends BaseRepository<SuggestedFixEntity<any>> {}
