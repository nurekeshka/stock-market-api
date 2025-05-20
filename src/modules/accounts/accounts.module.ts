import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HoldingsController } from './controller/holdings.controller';
import { TransactionsController } from './controller/transactions.controller';
import { Account, AccountSchema } from './schemas/accounts.schema';
import { AccountsService } from './service/accounts.service';
import { HoldingsService } from './service/holdings.service';
import { TransactionsService } from './service/transactions.service';

const models = [{ name: Account.name, schema: AccountSchema }];

@Module({
  imports: [MongooseModule.forFeature(models)],
  providers: [AccountsService, HoldingsService, TransactionsService],
  controllers: [HoldingsController, TransactionsController],
  exports: [AccountsService],
})
export class AccountsModule {}
