import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface MapPosition {
  top: number;
  left: number;
}

@Entity()
export class MapLocation {
  // this is the scenario number and is *not* generated
  @PrimaryColumn() number: number;
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column('json')
  mapPosition: MapPosition;

  @Column('json')
  relativeNumberPosition: MapPosition;

  @Column('json')
  relativeCheckboxPosition: MapPosition;
}
