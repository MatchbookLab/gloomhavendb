import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { In } from 'typeorm';
import { items } from '../../../data/items';
import { Item } from '../../../shared/entities/item';
import { BetterFindManyOptions } from '../base.repository';
import { ItemRepository } from './item.repository';
import { sortBy } from 'lodash';

@Controller('items')
export class ItemController {
  constructor(private itemRepo: ItemRepository) {
    this.seed();
  }

  @Get()
  async getItems(@Query('numbers') numberList?: string | (string | number)[]): Promise<Item[]> {
    const options: BetterFindManyOptions<Item> = { order: { number: 'ASC' } };

    if (numberList) {
      const idArray: number[] = (Array.isArray(numberList) ? numberList : numberList.split(',')).map(id => +id);
      options.where = { number: In(idArray) };
    }

    return await this.itemRepo.smartFind(options);
  }

  @Get(':id')
  async findItem(@Param('id') id: string | number): Promise<Item> {
    return this.itemRepo.smartFindOneOrFail(id);
  }

  @Post()
  async createItem(@Body() item: Item): Promise<Item> {
    item = this.itemRepo.scrub(item);
    return await this.itemRepo.saveNew(item);
  }

  @Put(':cardNo')
  async updateItem(@Param('cardNo') cardNo: string | number, @Body() item: Item): Promise<Item> {
    item = this.itemRepo.scrub(item);
    return await this.itemRepo.saveExisting(cardNo, item);
  }

  @Delete(':cardNo')
  async deleteItem(@Param('cardNo') cardNo: string | number): Promise<Item> {
    return await this.itemRepo.deleteAndReturn(cardNo);
  }

  private async seed() {
    if ((await this.itemRepo.smartFind()).length) {
      return;
    }

    await this.itemRepo.save(items);
  }
}
