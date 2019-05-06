import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SuggestedFixType } from '../../../shared/constants/suggested-fix-type';
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
  async getMatchingSuggestedFixes<T>(
    @Query('type') type: SuggestedFixType,
    @Query('idOrNumber') idOrNumber: string,
  ): Promise<SuggestedFix<T>[]> {
    return await this.suggestedFixRepo.find({
      type,
      idOrNumber,
    });
  }
}
