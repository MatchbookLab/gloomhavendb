export interface BattleGoal {
  // this ID is the little number below the text aka "card number"
  id: number;
  name: string;
  text: string;
  checkmarks: 1 | 2;
  imageUrl: string;
  verified: boolean;
}
