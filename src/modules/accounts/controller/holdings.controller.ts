import { Controller, Get, Inject, Param } from '@nestjs/common';
import { HoldingsService } from '../service/holdings.service';

@Controller('api/accounts/:accountId/holdings')
export class HoldingsController {
  @Inject(HoldingsService)
  private readonly service: HoldingsService;

  @Get()
  findAll(@Param('accountId') uuid: string) {
    return this.service.findAll(uuid);
  }
}
