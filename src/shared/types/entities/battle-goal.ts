export interface BattleGoal {
  id: number;
  name: string;
  isExtendedGoal: boolean;
  text: string;
  checks: 1 | 2;
  imageUrl: string;
  verified: boolean;
}
