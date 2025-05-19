import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { AccountsService } from '../service/accounts.service';

@Controller('api/accounts')
export class AccountsController {
  @Inject(AccountsService)
  private readonly service: AccountsService;

  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.service.create(dto);
  }
}
