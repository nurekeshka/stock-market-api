import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../schemas/accounts.schema';
import { Holding } from '../schemas/holdings.schema';

@Injectable()
export class HoldingsService {
  @InjectModel(Account.name)
  private readonly accounts: Model<Account>;

  async findAll(uuid: string): Promise<Holding[]> {
    const account = await this.accounts.findOne({ uuid }).exec();
    if (!account) throw Error(`Account doesn't exist`);

    return account.holdings;
  }

  async create(uuid: string, symbol: string): Promise<Account> {
    const account = await this.accounts.findOne({ uuid }).exec();
    if (!account) throw Error(`Account doesn't exist`);

    account.holdings.push({ symbol, transactions: [] });
    return account.save();
  }

  async findAllByUsername(username: string): Promise<Holding[]> {
    const account = await this.accounts.findOne({ username }).exec();
    if (!account) throw new Error(`Account doesn't exist`);

    return account.holdings;
  }

  async createByUsername(username: string, symbol: string): Promise<Account> {
    const account = await this.accounts.findOne({ username }).exec();
    if (!account) throw new Error(`Account doesn't exist`);

    account.holdings.push({ symbol, transactions: [] });
    return account.save();
  }
}
