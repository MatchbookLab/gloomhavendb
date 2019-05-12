import { MapGrid } from '../../constants/map-grid';

export interface Scenario {
  id: number;
  name: string;
  location: MapGrid;
  imageUrl: string;
  links: Scenario[];
  prerequisite: string;
  rewards: any;
}
