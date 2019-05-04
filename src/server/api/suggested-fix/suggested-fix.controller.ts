import { Body, Controller, Post } from '@nestjs/common';
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
}
