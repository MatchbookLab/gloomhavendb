import { MapGrid } from './map-grid';

// TODO: Scenario is a WIP: what data do we want to collect about it? how do we handle programatically checking prerequisites? and rewards? do we bother?
export interface Scenario {
  id: number;
  name: string;
  location: MapGrid;
  imageUrl: string;
  // other scenario IDs
  links: number[];
  prerequisite: any;
  rewards: any;
}
