import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BattleGoal {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isExtendedGoal: boolean;

  @Column()
  text: string;

  @Column()
  checks: 1 | 2;

  @Column()
  imageUrl: string;

  @Column()
  verified: boolean;
}
