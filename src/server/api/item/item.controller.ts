import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { In } from 'typeorm';
import { items } from '../../../data/items';
import { ItemEntity } from './item.entity';
import { NumberList } from '../../../shared/types/number-list';
import { numberListToArray } from '../../util/number-list-to-array';
import { BetterFindManyOptions } from '../base.repository';
import { ItemRepository } from './item.repository';

@Controller('items')
export class ItemController {
  constructor(private itemRepo: ItemRepository) {
    this.seed();
  }

  @Get()
  async getItems(@Query('numbers') numberList?: NumberList): Promise<ItemEntity[]> {
    const options: BetterFindManyOptions<ItemEntity> = { order: { number: 'ASC' } };

    if (numberList) {
      const numbers: number[] = numberListToArray(numberList);
      options.where = { number: In(numbers) };
    }

    return await this.itemRepo.smartFind(options);
  }

  @Get(':number')
  async findItem(@Param('number') number: string | number): Promise<ItemEntity> {
    return this.itemRepo.smartFindOneOrFail(number);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createItem(@Body() item: ItemEntity): Promise<ItemEntity> {
    item = this.itemRepo.scrub(item);
    return await this.itemRepo.saveNew(item);
  }

  @Put(':cardNo')
  @UseGuards(AuthGuard())
  async updateItem(@Param('cardNo') cardNo: string | number, @Body() item: ItemEntity): Promise<ItemEntity> {
    item = this.itemRepo.scrub(item);
    return await this.itemRepo.saveExisting(cardNo, item);
  }

  @Delete(':cardNo')
  @UseGuards(AuthGuard())
  async deleteItem(@Param('cardNo') cardNo: string | number): Promise<ItemEntity> {
    return await this.itemRepo.deleteAndReturn(cardNo);
  }

  private async seed() {
    if ((await this.itemRepo.smartFind()).length) {
      return;
    }

    await this.itemRepo.save(items);
  }
}
