import { Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { Account } from 'src/modules/accounts/schemas/accounts.schema';
import { AccountsService } from 'src/modules/accounts/service/accounts.service';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class HashStrategy {
  @Inject(AccountsService)
  private readonly accounts: AccountsService;

  async createAccount(dto: SignUpDto): Promise<Account> {
    const hash = await this.hash(dto.password);
    return this.accounts.create({ ...dto, password: hash });
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }
}
