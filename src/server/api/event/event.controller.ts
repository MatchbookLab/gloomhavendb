import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { events } from '../../../data/events';
import { Event } from '../../../shared/entities/event';
import { EventRepository } from './event.repository';

@Controller('events')
export class EventController {
  constructor(private eventRepo: EventRepository) {}

  @Get(':id')
  async findEvent(@Param('id') id: string) {
    return this.eventRepo.smartFindOneOrFail(id);
  }

  @Post()
  async createEvent(@Body() event: Event) {
    event = this.eventRepo.scrub(event);
    return await this.eventRepo.saveNew(event);
  }

  @Put(':id')
  async updateEvent(@Param('id') id: string, @Body() event: Event) {
    event = this.eventRepo.scrub(event);
    return await this.eventRepo.saveExisting(id, event);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return await this.eventRepo.deleteAndReturn(id);
  }
}
