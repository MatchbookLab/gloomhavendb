import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MapLocation, MapPosition } from '../../../shared/types/entities/map-location';

@Entity()
export class MapLocationEntity implements MapLocation {
  // this is the scenario number and is *not* generated
  @PrimaryColumn() number: number;

  @Column() name: string;

  @Column() imageUrl: string;

  @Column() width: number;

  @Column() height: number;

  @Column('json') mapPosition: MapPosition;

  @Column('json') relativeNumberPosition: MapPosition;

  @Column('json') relativeCheckboxPosition: MapPosition;
}
