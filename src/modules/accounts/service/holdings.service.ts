import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHoldingDto } from '../dtos/create-holding.dto';
import { Account } from '../schemas/accounts.schema';
import { Holding } from '../schemas/holdings.schema';

@Injectable()
export class HoldingsService {
  @InjectModel(Account.name)
  private readonly accounts: Model<Account>;

  async create(email: string, dto: CreateHoldingDto): Promise<Holding> {
    const account = await this.accounts.findOne({ email }).exec();
    if (!account) throw Error(`Account doesn't exist`);
    const holding: Holding = {
      symbol: dto.symbol,
      icon: dto.icon,
      name: dto.name,
      transactions: [],
    };

    account.holdings.push(holding);
    await account.save();

    return holding;
  }

  async findAll(email: string): Promise<Holding[]> {
    const account = await this.accounts.findOne({ email }).exec();
    if (!account) throw Error(`Account doesn't exist`);

    return account.holdings;
  }

  async findOne(email: string, symbol: string): Promise<Holding | undefined> {
    const account = await this.accounts.findOne({ email }).exec();
    if (!account) throw Error(`Account doesn't exist`);
    return account.holdings.find((holding) => holding.symbol === symbol);
  }
}
