import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { events } from '../../../data/events';
import { EventType } from '../../../shared/constants/event-type';
import { Event } from '../../../shared/entities/event';
import { EventRepository } from './event.repository';

@Controller('events')
export class EventController {
  constructor(private eventRepo: EventRepository) {}

  /////////////////
  // Road Events //
  /////////////////

  @Get('road')
  async getRoadEvents(): Promise<(Event)[]> {
    return this.getEvents(EventType.Road);
  }

  @Get('road/:cardNo')
  async findRoadEvent(@Param('cardNo') number: string | number): Promise<Event> {
    return this.findEvent(EventType.Road, number);
  }

  @Post('road')
  async createRoadEvent(@Body() event: Event): Promise<Event> {
    return this.createEvent(EventType.Road, event);
  }

  @Put('road/:cardNo')
  async updateRoadEvent(@Param('cardNo') number: string | number, @Body() event: Event): Promise<Event> {
    return this.updateEvent(EventType.Road, number, event);
  }

  @Delete('road/:cardNo')
  async deleteRoadEvent(@Param('cardNo') number: string | number): Promise<Event> {
    return this.deleteEvent(EventType.Road, number);
  }

  /////////////////
  // City Events //
  /////////////////

  @Get('city')
  async getCityEvents(): Promise<(Event)[]> {
    return this.getEvents(EventType.City);
  }

  @Get('city/:cardNo')
  async findCityEvent(@Param('cardNo') number: string | number): Promise<Event> {
    return this.findEvent(EventType.City, number);
  }

  @Post('city')
  async createCityEvent(@Body() event: Event): Promise<Event> {
    return this.createEvent(EventType.City, event);
  }

  @Put('city/:cardNo')
  async updateCityEvent(@Param('cardNo') number: string | number, @Body() event: Event): Promise<Event> {
    return this.updateEvent(EventType.City, number, event);
  }

  @Delete('city/:cardNo')
  async deleteCityEvent(@Param('cardNo') number: string | number): Promise<Event> {
    return this.deleteEvent(EventType.City, number);
  }

  ////////////////////
  // Shared Methods //
  ////////////////////

  private async getEvents(type: EventType): Promise<Event[]> {
    // TODO bad error handling
    return this.eventRepo.find({ type });
  }

  private async findEvent(type: EventType, number: string | number): Promise<Event> {
    // TODO bad error handling
    return this.eventRepo.findOneOrFail({ type, number: +number });
  }

  private async createEvent(type: EventType, event: Event): Promise<Event> {
    event = this.eventRepo.scrub(event);
    event.type = type;
    return await this.eventRepo.saveNew(event);
  }

  private async updateEvent(type: EventType, number: string | number, event: Event): Promise<Event> {
    event = this.eventRepo.scrub(event);
    event.type = type;
    return await this.eventRepo.saveExisting(number, event);
  }

  private async deleteEvent(type: EventType, number: string | number): Promise<Event> {
    return await this.eventRepo.deleteAndReturn(number);
  }
}
