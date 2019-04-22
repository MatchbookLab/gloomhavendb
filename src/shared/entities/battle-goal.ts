import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BattleGoal {
  // this ID is the little number below the text aka "card number," it is NOT auto-generated
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  text: string;

  @Column()
  checkmarks: 1 | 2;

  @Column()
  imageUrl: string;

  @Column()
  verified: boolean;
}
