import { Column, Entity, PrimaryColumn } from 'typeorm';
import { RandomScenario } from '../../../shared/types/entities/random-scenario';

@Entity()
export class RandomScenarioEntity implements RandomScenario {
  @PrimaryColumn('uuid') id: string;
  @Column() scenarioId: number;
  @Column() imageUrl: string;
}
