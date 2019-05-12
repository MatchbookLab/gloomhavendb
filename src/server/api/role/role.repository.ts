import { EntityRepository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseRepository } from '../base.repository';

@EntityRepository(RoleEntity)
export class RoleRepository extends BaseRepository<RoleEntity> {}
