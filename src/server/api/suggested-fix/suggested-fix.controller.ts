import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { RoleId } from '../../../shared/constants/role-id';
import { SuggestedFixType } from '../../../shared/constants/suggested-fix-type';
import { ItemEntity } from '../item/item.entity';
import { SuggestedFixEntity } from './suggested-fix.entity';
import { Roles } from '../../decorators/roles.decorator';
import { BASE_URL, DEFAULT_EMAIL_TO, HOSTNAME, PROTOCOL } from '../../environment';
import { RolesGuard } from '../../guards/roles.guard';
import { EmailerService } from '../../services/emailer/emailer.service';
import { ItemRepository } from '../item/item.repository';
import { SuggestedFixRepository } from './suggested-fix.repository';

@Controller('suggested-fix')
export class SuggestedFixController {
  constructor(
    private suggestedFixRepo: SuggestedFixRepository,
    private itemRepo: ItemRepository,
    private emailer: EmailerService,
  ) {}

  @Post()
  async suggestFix<T>(@Body() suggestedFix: SuggestedFixEntity<T>): Promise<SuggestedFixEntity<T>> {
    // TODO handle UUIDs
    const savedEntity = await this.suggestedFixRepo.save(suggestedFix);
    const fix = await this.suggestedFixRepo.findOne(savedEntity.id);

    await this.emailer.sendMail({
      to: DEFAULT_EMAIL_TO,
      subject: `Someone Suggested a Fix for ${fix.type}/${fix.idOrNumber}`,
      html: `Check out this new suggestion: ${BASE_URL}/${fix.type}/${fix.idOrNumber}`,
    });

    return fix;
  }

  @Get('matching')
  async getMatchingSuggestedFixes<T>(
    @Query('type') type: SuggestedFixType,
    @Query('idOrNumber') idOrNumber: string,
  ): Promise<SuggestedFixEntity<T>[]> {
    return await this.suggestedFixRepo.find({
      type,
      idOrNumber,
    });
  }

  @Post('commit')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleId.Admin)
  async commitFix<T>(@Body() payload: { id: string }): Promise<void> {
    const fix = await this.suggestedFixRepo.findOne(payload.id);

    if (!fix) {
      throw new NotFoundException(`A suggested fix with the ID of ${payload.id} was not found`);
    }

    switch (fix.type) {
      case SuggestedFixType.Item:
        const item: ItemEntity = fix.data;
        await this.itemRepo.saveExisting(item.number, item);
        break;
      default:
        throw new UnprocessableEntityException(`${fix.type} is not  yet supported by the API`);
    }

    await this.deleteMatchingSuggestedFixes(fix.type, fix.idOrNumber);
  }

  private async deleteMatchingSuggestedFixes<T>(
    @Query('type') type: SuggestedFixType,
    @Query('idOrNumber') idOrNumber: string,
  ): Promise<void> {
    await this.suggestedFixRepo.delete({
      type,
      idOrNumber,
    });
  }
}
