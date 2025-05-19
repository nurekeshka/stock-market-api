import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../schemas/accounts.schema';

@Injectable()
export class TransactionsService {
  @InjectModel(Account.name)
  private readonly accounts: Model<Account>;

  async create(uuid: string, symbol: string): Promise<Account> {
    const account = await this.accounts.findOne({ uuid }).exec();
    if (!account) throw Error(`Account doesn't exist`);

    account.holdings.push({ symbol, transactions: [] });
    return account.save();
  }
}
