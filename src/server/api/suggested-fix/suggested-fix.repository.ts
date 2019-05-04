import { EntityRepository } from 'typeorm';
import { SuggestedFix } from '../../../shared/entities/suggested-fix';
import { BaseRepository } from '../base.repository';

@EntityRepository(SuggestedFix)
export class SuggestedFixRepository extends BaseRepository<SuggestedFix<any>> {}
