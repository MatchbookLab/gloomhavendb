import { EventType } from '../../constants/event-type';

export interface Event {
  id?: number;
  number: number;
  type: EventType;
  text: string;
  optionA: EventChoice;
  optionB: EventChoice;
  imageUrl: string;
  verified: boolean;
}

export interface EventChoice {
  choice: string;
  outcome: string;
  imageUrl: string;
}
