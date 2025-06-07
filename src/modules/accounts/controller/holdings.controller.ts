import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Holding } from '../schemas/holdings.schema';
import { HoldingsService } from '../service/holdings.service';

@Controller('api/accounts/:username/holdings')
export class HoldingsController {
  @Inject(HoldingsService)
  private readonly service: HoldingsService;

  @Get()
  findAll(@Param('username') username: string): Promise<Holding[]> {
    return this.service.findAllByUsername(username);
  }
}
