import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { props } from '../../server/util/props';
import { EventConditionType } from '../constants/event-condition-type';
import { EventType } from '../constants/event-type';

@Entity()
@Unique(props<Event>('number', 'type'))
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  // this is the item number and is _not_ generated
  @Column()
  number: number;

  @Column()
  type: EventType;

  @Column()
  text: string;

  @OneToOne(() => EventChoice, choice => choice.eventA, { onDelete: 'CASCADE', cascade: true, eager: true })
  optionA: EventChoice;

  @OneToOne(() => EventChoice, choice => choice.eventB, { onDelete: 'CASCADE', cascade: true, eager: true })
  optionB: EventChoice;
  // image of the entire front

  @Column()
  imageUrl: string;

  @Column()
  verified: boolean;
}

@Entity()
export class EventChoice {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => Event, eventChoice => eventChoice.optionA, { onDelete: 'CASCADE' })
  @JoinColumn() // don't like join columns here, but makes for better delete
  eventA?: Event;

  @OneToOne(() => Event, eventChoice => eventChoice.optionB, { onDelete: 'CASCADE' })
  @JoinColumn() // don't like join columns here, but makes for better delete
  eventB?: Event;

  @Column()
  choice: string;

  @OneToMany(() => EventOutcome, eventOutcome => eventOutcome.choice, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  outcomes: EventOutcome[];
}

@Entity()
export class EventOutcome {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => EventChoice, choice => choice.outcomes, { onDelete: 'CASCADE' })
  @JoinColumn()
  choice?: EventChoice;

  @OneToOne(() => EventCondition, condition => condition.outcome, { onDelete: 'CASCADE' })
  @JoinColumn()
  condition: EventCondition | null;

  @Column()
  text: string;

  @OneToMany(() => EventOutcomeEffect, effect => effect.outcome, { onDelete: 'CASCADE', cascade: true, eager: true })
  effects: EventOutcomeEffect[];

  @Column()
  returnToDeck: boolean;
  // cropped image of just the relevant outcome

  @Column()
  imageUrl: string;
}

@Entity()
export class EventCondition {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => EventOutcome, outcome => outcome.condition, { onDelete: 'CASCADE' })
  outcome?: EventOutcome;

  @Column()
  text: string;

  @OneToMany(() => EventRequirement, requirement => requirement.condition, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  requirements: EventRequirement[];
}

@Entity()
export class EventOutcomeEffect {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => EventRequirement, requirement => requirement.effect, { onDelete: 'CASCADE' })
  eventRequirement?: EventRequirement;

  @ManyToOne(() => EventOutcome, outcome => outcome.effects, { onDelete: 'CASCADE' })
  @JoinColumn()
  outcome?: EventOutcome;

  @Column()
  text: string;

  @OneToMany(() => EventRequirement, requirement => requirement.effect, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  requirements: EventRequirement[] | null;
}

@Entity()
export class EventRequirement {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => EventRequirement, requirement => requirement.effect, { onDelete: 'CASCADE' })
  @JoinColumn()
  effect?: EventOutcomeEffect;

  @ManyToOne(() => EventCondition, condition => condition.requirements, { onDelete: 'CASCADE' })
  @JoinColumn()
  condition?: EventCondition;

  @Column()
  type: EventConditionType;

  @Column()
  value: string;
}
