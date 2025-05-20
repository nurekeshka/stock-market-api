import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Transaction } from '../schemas/transactions.schema';
import { TransactionsService } from '../service/transactions.service';

@Controller('api/accounts/:accountId/holdings')
export class TransactionsController {
  @Inject(TransactionsService)
  private readonly service: TransactionsService;

  @Get()
  findAll(@Param('accountId') uuid: string): Promise<Transaction[]> {
    return [{ uuid }] as never;
  }
}
