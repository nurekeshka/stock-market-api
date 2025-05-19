import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../schemas/accounts.schema';

@Injectable()
export class AccountsService {
  @InjectModel(Account.name)
  private readonly repository: Model<Account>;

  findAll() {
    return this.repository.find().exec();
  }
}
