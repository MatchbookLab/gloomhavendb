import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint, ApiBody, ApiParam, ApiQuery, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { In } from 'typeorm';
import { items } from '../../../data/items';
import { NumberList } from '../../../shared/types/number-list';
import { numberListToArray } from '../../util/number-list-to-array';
import { BetterFindManyOptions } from '../base.repository';
import { ItemEntity } from './item.entity';
import { ItemRepository } from './item.repository';

// @ApiExcludeEndpoint() are to hide endpoints that won't be available until custom content is ready

@Controller('items')
@ApiTags('Items')
export class ItemController {
  constructor(private itemRepo: ItemRepository) {
    this.seed();
  }

  @Get()
  @ApiOkResponse({ description: 'All of the Items.', type: [ItemEntity] })
  @ApiQuery({
    name: 'numbers',
    description:
      'The numbers of the items you want to return. Accepts array of numbers or comma/space/pipe separated list.',
    type: '"csv" | "ssv" | "pipes" | (string | number)[]',
    required: false,
  })
  async getItems(@Query('numbers') numberList?: NumberList): Promise<ItemEntity[]> {
    const options: BetterFindManyOptions<ItemEntity> = { order: { number: 'ASC' } };

    if (numberList) {
      const numbers: number[] = numberListToArray(numberList);
      options.where = { number: In(numbers) };
    }

    return await this.itemRepo.smartFind(options);
  }

  @Get(':number')
  @ApiParam({ name: 'number', description: 'The number of the item.', type: 'string | number', required: true })
  @ApiOkResponse({ description: 'The specified item.', type: ItemEntity })
  async findItem(@Param('number') number: string | number): Promise<ItemEntity> {
    return this.itemRepo.smartFindOneOrFail(number);
  }

  @Post()
  @ApiExcludeEndpoint()
  @ApiBody({ /* name: 'item', */ type: ItemEntity, description: 'The Item to create.', required: true })
  @UseGuards(AuthGuard())
  async createItem(@Body() item: ItemEntity): Promise<ItemEntity> {
    item = this.itemRepo.scrub(item);
    return await this.itemRepo.saveNew(item);
  }

  @Put(':number')
  @ApiExcludeEndpoint()
  @ApiBody({ /* name: 'item', */ type: ItemEntity, description: 'The Item to update.', required: true })
  @UseGuards(AuthGuard())
  async updateItem(@Param('number') number: string | number, @Body() item: ItemEntity): Promise<ItemEntity> {
    item = this.itemRepo.scrub(item);
    return await this.itemRepo.saveExisting(number, item);
  }

  @Delete(':number')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'number', description: 'The Item number to delete.' })
  @ApiOkResponse({ description: 'The Item that was deleted.', type: ItemEntity })
  @UseGuards(AuthGuard())
  async deleteItem(@Param('number') number: string | number): Promise<ItemEntity> {
    return await this.itemRepo.deleteAndReturn(number);
  }

  private async seed() {
    if ((await this.itemRepo.smartFind()).length) {
      return;
    }

    await this.itemRepo.save(items);
  }
}
