import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { MapGrid } from '../../../shared/constants/map-grid';
import { Scenario } from '../../../shared/types/entities/scenario';

// TODO: Scenario is a WIP: what data do we want to collect about it? how do we handle programatically checking prerequisites? and rewards? do we bother?
@Entity()
export class ScenarioEntity implements Scenario {
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column('json') location: MapGrid;
  @Column() imageUrl: string;
  @ManyToMany(() => ScenarioEntity, scenario => scenario.id)
  @JoinTable()
  links: ScenarioEntity[];
  @Column() prerequisite: string;
  @Column('json') rewards: any; // TBD
}
