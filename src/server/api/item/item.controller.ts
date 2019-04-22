import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { items } from '../../../data/items';
import { Item } from '../../../shared/entities/item';
import { ItemRepository } from './item.repository';
import { sortBy } from 'lodash';

@Controller('items')
export class ItemController {
  constructor(private itemRepo: ItemRepository) {
    this.seed();
  }

  @Get()
  async getItems() {
    return sortBy(await this.itemRepo.smartFind(), 'number');
  }

  @Get(':id')
  async findItem(@Param('id') id: string) {
    return this.itemRepo.smartFindOneOrFail(id);
  }

  @Post()
  async createItem(@Body() item: Item) {
    item = this.itemRepo.scrub(item);
    return await this.itemRepo.saveNew(item);
  }

  @Put(':id')
  async updateItem(@Param('id') id: string, @Body() item: Item) {
    item = this.itemRepo.scrub(item);
    return await this.itemRepo.saveExisting(id, item);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return await this.itemRepo.deleteAndReturn(id);
  }

  private async seed() {
    if ((await this.itemRepo.smartFind()).length) {
      return;
    }

    await this.itemRepo.save(items);
  }
}
