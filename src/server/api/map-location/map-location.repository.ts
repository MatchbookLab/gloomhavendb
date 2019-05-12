import { EntityRepository } from 'typeorm';
import { MapLocationEntity } from './map-location.entity';
import { BaseRepository } from '../base.repository';

@EntityRepository(MapLocationEntity)
export class MapLocationRepository extends BaseRepository<MapLocationEntity> {}
