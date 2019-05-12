import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiOkResponse } from '@nestjs/swagger';
import { events } from '../../../data/events';
import { EventType } from '../../../shared/constants/event-type';
import { EventEntity } from './event.entity';
import { EventRepository } from './event.repository';

@Controller('events')
export class EventController {
  constructor(private eventRepo: EventRepository) {
    this.seed();
  }

  /////////////////
  // Road Events //
  /////////////////

  @Get('road')
  @ApiOkResponse({ description: 'All of the Road Events.', type: [EventEntity] })
  async getRoadEvents(): Promise<EventEntity[]> {
    return this.getEvents(EventType.Road);
  }

  @Get('road/:cardNo')
  @ApiImplicitParam({ name: 'cardNo', description: 'The event card number.' })
  @ApiOkResponse({ description: 'The Road Event with the card number used.', type: EventEntity })
  async findRoadEvent(@Param('cardNo') number: string | number): Promise<EventEntity> {
    return this.findEvent(EventType.Road, number);
  }

  @Post('road')
  @UseGuards(AuthGuard())
  @ApiImplicitBody({
    name: 'event.entity.ts',
    type: EventEntity,
    description: 'The Road Event to create.',
    required: true,
  })
  @ApiOkResponse({ description: 'The Road Event that was created.', type: EventEntity })
  async createRoadEvent(@Body() event: EventEntity): Promise<EventEntity> {
    return this.createEvent(EventType.Road, event);
  }

  @Put('road/:cardNo')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'cardNo', description: 'The event card number.' })
  @ApiImplicitBody({
    name: 'event.entity.ts',
    type: EventEntity,
    description: 'The Road Event to update.',
    required: true,
  })
  @ApiOkResponse({ description: 'The Road Event that was updated.', type: EventEntity })
  async updateRoadEvent(@Param('cardNo') number: string | number, @Body() event: EventEntity): Promise<EventEntity> {
    return this.updateEvent(EventType.Road, number, event);
  }

  @Delete('road/:cardNo')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'cardNo', description: 'The event card number.' })
  @ApiOkResponse({ description: 'The Road Event that was deleted.', type: EventEntity })
  async deleteRoadEvent(@Param('cardNo') number: string | number): Promise<EventEntity> {
    return this.deleteEvent(EventType.Road, number);
  }

  /////////////////
  // City Events //
  /////////////////

  @Get('city')
  @ApiOkResponse({ description: 'All of the City Events.', type: [EventEntity] })
  async getCityEvents(): Promise<(EventEntity)[]> {
    return this.getEvents(EventType.City);
  }

  @Get('city/:cardNo')
  @ApiImplicitParam({ name: 'cardNo', description: 'The event card number.' })
  @ApiOkResponse({ description: 'The City Event with the card number used.', type: EventEntity })
  async findCityEvent(@Param('cardNo') number: string | number): Promise<EventEntity> {
    return this.findEvent(EventType.City, number);
  }

  @Post('city')
  @UseGuards(AuthGuard())
  @ApiImplicitBody({
    name: 'event.entity.ts',
    type: EventEntity,
    description: 'The City Event to create.',
    required: true,
  })
  @ApiOkResponse({ description: 'The City Event that was created.', type: EventEntity })
  async createCityEvent(@Body() event: EventEntity): Promise<EventEntity> {
    return this.createEvent(EventType.City, event);
  }

  @Put('city/:cardNo')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'cardNo', description: 'The event card number.' })
  @ApiImplicitBody({
    name: 'event.entity.ts',
    type: EventEntity,
    description: 'The City Event to update.',
    required: true,
  })
  @ApiOkResponse({ description: 'The City Event that was updated.', type: EventEntity })
  async updateCityEvent(@Param('cardNo') number: string | number, @Body() event: EventEntity): Promise<EventEntity> {
    return this.updateEvent(EventType.City, number, event);
  }

  @Delete('city/:cardNo')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'cardNo', description: 'The event card number.' })
  @ApiOkResponse({ description: 'The City Event that was deleted.', type: EventEntity })
  async deleteCityEvent(@Param('cardNo') number: string | number): Promise<EventEntity> {
    return this.deleteEvent(EventType.City, number);
  }

  ////////////////////
  // Shared Methods //
  ////////////////////

  private async getEvents(type: EventType): Promise<EventEntity[]> {
    // TODO bad error handling
    return this.eventRepo.find({ where: { type }, order: { number: 'ASC' } });
  }

  private async findEvent(type: EventType, number: string | number): Promise<EventEntity> {
    // TODO bad error handling
    return this.eventRepo.findOneOrFail({ type, number: +number });
  }

  private async createEvent(type: EventType, event: EventEntity): Promise<EventEntity> {
    event = this.eventRepo.scrub(event);
    event.type = type;
    return await this.eventRepo.saveNew(event);
  }

  private async updateEvent(type: EventType, number: string | number, event: EventEntity): Promise<EventEntity> {
    event = this.eventRepo.scrub(event);
    event.type = type;
    return await this.eventRepo.saveExisting(number, event);
  }

  private async deleteEvent(type: EventType, number: string | number): Promise<EventEntity> {
    return await this.eventRepo.deleteAndReturn(number);
  }

  private async seed() {
    if ((await this.eventRepo.smartFind()).length) {
      return;
    }

    await this.eventRepo.save(events);
  }
}
