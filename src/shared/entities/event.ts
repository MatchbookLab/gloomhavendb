import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { props } from '../../server/util/props';
import { EventType } from '../constants/event-type';

export class EventOutcome {
  @ApiModelProperty({
    description: 'The text of the outcome.',
    example: 'The fight did not go well... Take 2 damage.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiModelProperty({
    description: 'Image URL of everything cropped but the relevant outcome.',
    example: 'http://example.com/images/event-road-01-a-a-t.png',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl: string;

  @ApiModelProperty({
    description: 'Whether you lose the card (true) or put it on the bottom of the deck (false).',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  loseCard: boolean;
}

export class EventChoice {
  @ApiModelProperty({
    description: 'The matching choice text at the bottom of the front of the card.',
    example: 'You decide to join the fight.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  choice: string;

  @ApiModelProperty({ description: 'Event outcome.', type: EventOutcome, isArray: true })
  @IsNotEmpty()
  @ValidateNested()
  outcomes: EventOutcome[];

  @ApiModelProperty({
    description: 'Image URL of half of the back of the card.',
    example: 'http://example.com/images/event-road-01-a-a.png',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl: string;
}

@Entity()
@Unique(props<Event>('number', 'type'))
export class Event {
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

  @Column('json')
  @ApiModelProperty({ description: 'Option A.', type: EventChoice })
  @IsNotEmpty()
  @ValidateNested()
  optionA: EventChoice;

  @Column('json')
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
  @IsUrl()
  imageUrl: string; // image of the entire front

  @Column({ default: false })
  @ApiModelProperty({
    description: 'Whether or not the data in this event has been manually reviewed and verified.',
    default: false,
    example: false,
  })
  @IsBoolean()
  verified: boolean;
}
