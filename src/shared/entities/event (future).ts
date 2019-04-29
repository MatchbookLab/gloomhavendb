import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { props } from '../../server/util/props';
import { EventConditionType } from '../constants/event-condition-type';
import { EventType } from '../constants/event-type';

@Entity()
class EventRequirement {
  @PrimaryGeneratedColumn()
  // @IsInt()
  // @Min(1)
  id?: number;

  @ManyToOne(() => EventRequirement, requirement => requirement.effect, { onDelete: 'CASCADE' })
  @JoinColumn()
  effect?: EventOutcomeEffect;

  @ManyToOne(() => EventCondition, condition => condition.requirements, { onDelete: 'CASCADE' })
  @JoinColumn()
  condition?: EventCondition;

  @Column()
  @ApiModelProperty({
    description: 'The type of condition that needs to be met.',
    example: EventConditionType.ClassPresent,
    enum: EventConditionType,
  })
  @ValidateNested()
  @IsNotEmpty()
  @IsEnum(EventConditionType)
  type: EventConditionType;

  @Column()
  @ApiModelProperty({
    description: `A value that can be applied to the relevant type. Use Class Number for ${
      EventConditionType.ClassPresent
    }`,
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  value: string;
}

@Entity()
class EventOutcomeEffect {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => EventRequirement, requirement => requirement.effect, { onDelete: 'CASCADE' })
  eventRequirement?: EventRequirement;

  @ManyToOne(() => EventOutcome, outcome => outcome.effects, { onDelete: 'CASCADE' })
  @JoinColumn()
  outcome?: EventOutcome;

  @Column()
  @ApiModelProperty({
    description: 'The effect as a result of the outcome.',
    example: 'Start the next scenario with 2 Damage.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @OneToMany(() => EventRequirement, requirement => requirement.effect, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @ApiModelProperty({
    description: 'Some outcomes will happen regardless, but the mount of the effect may differ based on factors.',
    required: false,
    type: EventRequirement,
    isArray: true,
    example: <EventRequirement[]>[
      {
        type: EventConditionType.ReputationAbove,
        value: '5',
      },
    ],
  })
  @ValidateNested()
  requirements: EventRequirement[] | null;
}

@Entity()
class EventOutcome {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({
    description: 'An unique ID. Should be present when updating an event.',
    example: 1,
    required: false,
  })
  // @IsInt()
  // @Min(1)
  id?: number;

  @ManyToOne(() => EventChoice, choice => choice.outcomes, { onDelete: 'CASCADE' })
  @JoinColumn()
  choice?: EventChoice;

  @OneToOne(() => EventCondition, condition => condition.outcome, { onDelete: 'CASCADE' })
  @JoinColumn()
  condition: EventCondition | null;

  @Column()
  @ApiModelProperty({
    description: 'The flavor text for the outcome.',
    example: 'The fight did not go your way...',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @OneToMany(() => EventOutcomeEffect, effect => effect.outcome, { onDelete: 'CASCADE', cascade: true, eager: true })
  @ApiModelProperty({
    description: 'The effects as a result of the outcome, even if "No Effect".',
    required: true,
    type: EventOutcomeEffect,
    isArray: true,
  })
  @ValidateNested()
  @IsNotEmpty()
  effects: EventOutcomeEffect[];

  @Column()
  @ApiModelProperty({
    description: 'Whether or not the card should be returned to the bottom of the deck.',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  returnToDeck: boolean;

  // cropped image of just the relevant outcome
  @Column()
  @ApiModelProperty({
    description: 'A URL to the an image that is a cropped image of the scanned card showing only the relevant outcome.',
    example: 'http://example.com/images/event-road-outcome-2.png',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}

@Entity()
class EventChoice {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({
    description: 'An unique ID. Should be present when updating an event.',
    example: 1,
    required: false,
  })
  // @IsInt()
  // @Min(1)
  id?: number;

  @OneToOne(() => Event, eventChoice => eventChoice.optionA, { onDelete: 'CASCADE' })
  @JoinColumn() // don't like join columns here, but makes for better delete
  eventA?: Event;

  @OneToOne(() => Event, eventChoice => eventChoice.optionB, { onDelete: 'CASCADE' })
  @JoinColumn() // don't like join columns here, but makes for better delete
  eventB?: Event;

  @Column()
  @ApiModelProperty({
    description: 'The appropriate choice text at the bottom of the front of the card.',
    example: 'You decide to join the fight.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  choice: string;

  @OneToMany(() => EventOutcome, eventOutcome => eventOutcome.choice, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @ApiModelProperty({
    description: 'The outcome or consequences of your choice.',
    required: true,
    type: EventOutcome,
    isArray: true,
  })
  @IsNotEmpty()
  @ValidateNested()
  outcomes: EventOutcome[];
}

@Entity()
@Unique(props<Event>('number', 'type'))
class Event {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({
    description: 'An unique ID. Not directly used externally, use "number" instead.',
    example: 1,
    required: false,
  })
  // @IsInt()
  // @Min(1)
  id?: number;

  // this is the item number and is *not* generated
  @Column()
  @ApiModelProperty({ description: 'The event number.', example: 1, required: true })
  @IsNotEmpty()
  // @IsInt()
  // @Min(1)
  number: number;

  @Column()
  @ApiModelProperty({
    description: 'The event number. Overridden by endpoint you use.',
    example: EventType.Road,
    required: true,
    enum: EventType,
  })
  @IsNotEmpty()
  @IsEnum(EventType)
  type: EventType;

  @Column()
  @ApiModelProperty({
    description: 'The flavor text that sets up the event.',
    example: 'While enjoying drinks at the Sleeping Lion...',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @OneToOne(() => EventChoice, choice => choice.eventA, { onDelete: 'CASCADE', cascade: true, eager: true })
  @ApiModelProperty({ description: 'Option A.', type: EventChoice })
  @IsNotEmpty()
  @ValidateNested()
  optionA: EventChoice;

  @OneToOne(() => EventChoice, choice => choice.eventB, { onDelete: 'CASCADE', cascade: true, eager: true })
  @ApiModelProperty({ description: 'Option B.', type: EventChoice })
  @IsNotEmpty()
  @ValidateNested()
  optionB: EventChoice;

  @Column()
  @ApiModelProperty({
    description: 'A URL to a high quality scan of the front of the Event',
    required: true,
    example: 'http://example.com/images/event-road-01.png',
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string; // image of the entire front

  @Column({ default: false })
  @ApiModelProperty({
    description: 'Whether or not the data in this event has been manually reviewed and verified.',
    default: false,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  verified: boolean;
}

@Entity()
class EventCondition {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({
    description: 'An unique ID. Should be present when updating an event.',
    example: 1,
    required: false,
  })
  // @IsInt()
  // @Min(1)
  id?: number;

  @OneToOne(() => EventOutcome, outcome => outcome.condition, { onDelete: 'CASCADE' })
  outcome?: EventOutcome;

  @Column()
  @ApiModelProperty({
    description: 'The requirement(s) needed to be able to get this outcome in text form.',
    example: 'Cragheart is in the party.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @OneToMany(() => EventRequirement, requirement => requirement.condition, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @ApiModelProperty({
    description: 'The requirement(s) needed to be able to get this outcome in "EventRequirement" form.',
    required: false,
    type: EventRequirement,
    isArray: true,
  })
  @ValidateNested()
  requirements: EventRequirement[];
}
