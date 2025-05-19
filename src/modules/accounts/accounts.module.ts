import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './controller/accounts.controller';
import { Account, AccountSchema } from './schemas/accounts.schema';
import { AccountsService } from './service/accounts.service';

const models = [{ name: Account.name, schema: AccountSchema }];

@Module({
  imports: [MongooseModule.forFeature(models)],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
