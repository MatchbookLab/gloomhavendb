import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RandomScenario {
  // this ID is the little number below the text aka "card number"
  @PrimaryColumn() id: number;
  @Column() scenarioId: number;
  @Column() imageUrl: string;
}
