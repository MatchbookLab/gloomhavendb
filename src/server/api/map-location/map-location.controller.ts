import { Controller, Get, Param, Query } from '@nestjs/common';
import { In } from 'typeorm';
import { mapLocations } from '../../../data/map-locations';
import { MapLocation } from '../../../shared/entities/map-location';
import { NumberList } from '../../../shared/types/number-list';
import { numberListToArray } from '../../util/number-list-to-array';
import { BetterFindManyOptions } from '../base.repository';
import { MapLocationRepository } from './map-location.repository';

@Controller('map-locations')
export class MapLocationController {
  constructor(private mapLocationRepo: MapLocationRepository) {
    this.seed();
  }

  @Get()
  async getMapLocations(@Query('numbers') numberList?: NumberList): Promise<MapLocation[]> {
    const options: BetterFindManyOptions<MapLocation> = { order: { number: 'ASC' } };

    if (numberList) {
      const numbers: number[] = numberListToArray(numberList);
      options.where = { number: In(numbers) };
    }

    return await this.mapLocationRepo.smartFind(options);
  }

  @Get(':number')
  async findMapLocation(@Param('number') number: string | number): Promise<MapLocation> {
    return this.mapLocationRepo.smartFindOneOrFail(number);
  }

  private async seed() {
    if ((await this.mapLocationRepo.smartFind()).length) {
      return;
    }

    await this.mapLocationRepo.save(mapLocations);
  }
}
