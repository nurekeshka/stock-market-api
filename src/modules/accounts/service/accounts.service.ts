import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { Account } from '../schemas/accounts.schema';

@Injectable()
export class AccountsService {
  @InjectModel(Account.name)
  private readonly accounts: Model<Account>;

  async create(dto: CreateAccountDto) {
    if (await this.accounts.exists({ username: dto.username }).exec())
      throw new BadRequestException('Account with this username exists');

    return this.accounts.create(dto);
  }
}
