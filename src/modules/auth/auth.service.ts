import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountsServiceConstant } from './auth.constants';
import { AccountDto, AccountsServiceInterface } from './auth.interfaces';

@Injectable()
export class AuthService {
  @Inject(AccountsServiceConstant)
  private readonly accounts: AccountsServiceInterface;

  @Inject(JwtService)
  private readonly jwts: JwtService;

  async validate(email: string, pass: string): Promise<any> {
    const account = await this.accounts.findOne(email);

    if (account && (await bcrypt.compare(pass, account.password))) {
      const { password, ...result } = account.toObject();
      return result;
    }

    return null;
  }

  login<T = AccountDto>(account: T) {
    const payload = { email: account.email, sub: account._id };
    return {
      access_token: this.jwts.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.accounts.create({ ...dto, password: hashed });
    return this.login(user);
  }
}
