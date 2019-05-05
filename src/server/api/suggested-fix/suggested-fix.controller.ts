import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SuggestedFix } from '../../../shared/entities/suggested-fix';
import { SuggestedFixRepository } from './suggested-fix.repository';

@Controller('suggested-fix')
export class SuggestedFixController {
  constructor(private suggestedFixRepo: SuggestedFixRepository) {}

  @Post()
  async suggestFix<T>(@Body() suggestedFix: SuggestedFix<T>): Promise<SuggestedFix<T>> {
    // TODO handle UUIDs
    const savedEntity = await this.suggestedFixRepo.save(suggestedFix);
    return this.suggestedFixRepo.findOne(savedEntity.id);
  }

  @Get('matching')
  async matchingSuggestedFixes<T>(
    @Query('entityType') entityType: string,
    @Query('entityIdOrNumber') entityIdOrNumber: string | number,
  ): Promise<SuggestedFix<T>[]> {
    entityIdOrNumber = entityIdOrNumber + ''; // ensure string
    console.log({
      entityType,
      entityIdOrNumber,
    });
    return await this.suggestedFixRepo.find({
      entityType,
      entityIdOrNumber,
    });
  }
}
