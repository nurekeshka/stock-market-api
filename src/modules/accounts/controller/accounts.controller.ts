import { Controller, Inject } from '@nestjs/common';
import { AccountsService } from '../service/accounts.service';

@Controller('api/accounts')
export class AccountsController {
  @Inject(AccountsService)
  private readonly service: AccountsService;
}
