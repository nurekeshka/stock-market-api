import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Account } from '../../accounts/schemas/accounts.schema';
import { AccountsService } from '../../accounts/service/accounts.service';
import { JwtResponseDto } from '../dtos/jwt-response.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { ValidationDto } from '../dtos/validation.dto';
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

  async login(dto: SignInDto): Promise<Account | null> {
    const account = await this.accounts.findOne(dto.email);
    return account &&
      (await this.hashes.compare(dto.password, account.password))
      ? account
      : null;
  }

  createJwt(schema: Account): JwtResponseDto {
    return {
      access_token: this.jwts.sign(this.transform(schema)),
    };
  }

  validate(dto: ValidationDto): ValidationDto {
    return { email: dto.email };
  }

  transform(schema: SignInDto): SignInDto {
    return {
      email: schema.email,
      password: schema.password,
    };
  }
}
