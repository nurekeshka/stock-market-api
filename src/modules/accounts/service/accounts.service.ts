import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/modules/auth/dtos/sign-up.dto';
import { Account } from '../schemas/accounts.schema';

@Injectable()
export class AccountsService {
  @InjectModel(Account.name)
  private readonly accounts: Model<Account>;

  async create(dto: SignUpDto): Promise<Account> {
    if (await this.accounts.exists({ username: dto.email }).exec())
      throw new BadRequestException('Account with this username exists');

    return this.accounts.create(dto);
  }

  findOne(email: string): Promise<Account | null> {
    return this.accounts.findOne({ email }).exec();
  }
}
