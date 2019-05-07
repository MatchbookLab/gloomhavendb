import { EntityRepository } from 'typeorm';
import { MapLocation } from '../../../shared/entities/map-location';
import { BaseRepository } from '../base.repository';

@EntityRepository(MapLocation)
export class MapLocationRepository extends BaseRepository<MapLocation> {}
