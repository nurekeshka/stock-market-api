import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Account } from 'src/modules/accounts/schemas/accounts.schema';
import { AccountsService } from 'src/modules/accounts/service/accounts.service';
import { JwtResponseDto } from '../dtos/jwt-response.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { HashStrategy } from './hash.strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(JwtService)
  private readonly jwts: JwtService;

  @Inject(HashStrategy)
  private readonly hashes: HashStrategy;

  @Inject(AccountsService)
  private readonly accounts: AccountsService;

  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('auth.jwt.secret'),
    });
  }

  async validate(dto: SignInDto): Promise<Account | null> {
    const account = await this.accounts.findOne(dto.username);
    return account &&
      (await this.hashes.compare(dto.password, account.password))
      ? account
      : null;
  }

  createJwt(schema: Account): JwtResponseDto {
    return {
      access_token: this.jwts.sign({
        username: schema.username,
        password: schema.password,
      }),
    };
  }
}
