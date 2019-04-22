import { EventType } from '../constants/event-type';
import { EventConditionType } from '../constants/event-condition-type';

export interface Event {
  id: number;
  eventType: EventType;
  text: string;
  optionA: EventChoice;
  optionB: EventChoice;
  // image of the entire front
  imageUrl: string;
  verified: boolean;
}

export interface EventChoice {
  choice: string;
  outcomes: EventOutcome[];
}

export interface EventOutcome {
  condition: EventCondition | null;
  text: string;
  effects: EventOutcomeEffect[];
  returnToDeck: boolean;
  // cropped image of just the relevant outcome
  imageUrl: string;
}

export interface EventCondition {
  text: string;
  requirements: EventRequirement[];
}

export interface EventOutcomeEffect {
  text: string;
  requirements: EventRequirement[] | null;
}

export interface EventRequirement {
  type: EventConditionType;
  value: string | number;
}
