import { EntityRepository } from 'typeorm';
import { Role } from '../../../shared/entities/role';
import { BaseRepository } from '../base.repository';

@EntityRepository(Role)
export class RoleRepository extends BaseRepository<Role> {}
