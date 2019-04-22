import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { MapGrid } from '../constants/map-grid';

// TODO: Scenario is a WIP: what data do we want to collect about it? how do we handle programatically checking prerequisites? and rewards? do we bother?
@Entity()
export class Scenario {
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column('json') location: MapGrid;
  @Column() imageUrl: string;
  @ManyToMany(() => Scenario, scenario => scenario.id)
  @JoinTable()
  links: Scenario[];
  @Column() prerequisite: string;
  @Column('json') rewards: any; // TBD
}
