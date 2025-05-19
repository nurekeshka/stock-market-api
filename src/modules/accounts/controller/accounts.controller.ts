import { Controller, Get, Inject } from '@nestjs/common';
import { AccountsService } from '../service/accounts.service';

@Controller('api/accounts')
export class AccountsController {
  @Inject(AccountsService)
  private readonly service: AccountsService;

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
