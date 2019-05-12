import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ItemSource } from '../../../shared/constants/item-source';
import { Limit } from '../../../shared/constants/limit';
import { Slot } from '../../../shared/constants/slot';
import { Item } from '../../../shared/types/entities/item';

@Entity()
export class ItemEntity implements Item {
  // this is the item number and is *not* generated
  @PrimaryColumn()
  @ApiModelProperty({
    description: 'The item number.',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  number: number;

  @Column()
  @ApiModelProperty({
    description: 'The name of the item.',
    example: 'Hide Armor',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column('enum', { enum: Slot })
  @ApiModelProperty({
    description: 'The slot where the item is equipped.',
    example: Slot.Body,
    required: true,
    enum: Slot,
  })
  @IsNotEmpty()
  @IsEnum(Slot)
  slot: Slot;

  @Column()
  @ApiModelProperty({
    description: 'The price of the item.',
    example: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @ApiModelProperty({
    description: 'A text describing what the item does. Accepts "{IconName} Syntax."',
    example: 'On the next two sources of damage to you from attacks, gain Shield {Shield} 1.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @Column({ nullable: true /* hopefully temp */ })
  @ApiModelProperty({
    description: 'The number of items that are available.',
    example: 2,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @Column('enum', { enum: Limit, nullable: true /* hopefully temp */ })
  @ApiModelProperty({
    description: 'The limitations to how the item is spent/consumed.',
    example: Limit.Spent,
    required: true,
    enum: Limit,
  })
  @IsNotEmpty()
  @IsEnum(Limit)
  limit: Limit;

  @Column({ nullable: true })
  @ApiModelProperty({
    description: 'The number of uses/charges the item has.',
    example: 2,
    required: false,
  })
  @IsNumber()
  uses: number | null;

  @Column({ nullable: true })
  @ApiModelProperty({
    description: 'The number of -1 cards that must be added to the attack deck to equip.',
    example: 2,
    required: false,
  })
  @IsNumber()
  negativeCardsCount: number | null;

  @Column('enum', { enum: ItemSource, nullable: true /* hopefully temp */ })
  @ApiModelProperty({
    description: 'The source (type) where the item comes can be found. Used in combination with the source ID.',
    example: ItemSource.Prosperity,
    required: true,
    enum: ItemSource,
  })
  @IsEnum(ItemSource)
  @IsNotEmpty()
  sourceType: ItemSource;

  @Column({ nullable: true })
  @ApiModelProperty({
    description:
      'A number that corresponds with the source type to determine where the item can be found. ' +
      'e.g. 1 means Prosperity 1 if source type is Prosperity or Scenario 1 if type is Scenario Reward. ' +
      '(Only optional for Random Item Designs)',
    example: 1,
    required: false,
  })
  @IsNumber()
  sourceId: number | null;

  @Column()
  @ApiModelProperty({
    description: 'URL to a an image of the item.',
    example: 'https://gloomhavendb.com/assets/cards/items/1-14/hide-armor.png',
    required: true,
  })
  @IsNumber()
  imageUrl: string;

  @Column({ default: false })
  @ApiModelProperty({
    description: 'Whether the info has been verified (temporary field).',
    example: true,
    default: false,
    required: false,
  })
  @IsBoolean()
  verified: boolean;
}
