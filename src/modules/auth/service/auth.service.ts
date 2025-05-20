import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtResponseDto } from '../dtos/jwt-response.dto';
import { ProfileResponseDto } from '../dtos/profile.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { HashStrategy } from '../strategies/hash.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Injectable()
export class AuthService {
  @Inject(JwtStrategy)
  private readonly jwts: JwtStrategy;

  @Inject(HashStrategy)
  private readonly hashes: HashStrategy;

  async signIn(dto: SignInDto): Promise<JwtResponseDto> {
    const account = await this.jwts.login(dto);
    if (account === null) throw new UnauthorizedException();
    return this.jwts.createJwt(account);
  }

  async signUp(dto: SignUpDto): Promise<JwtResponseDto> {
    const account = await this.hashes.createAccount(dto);
    return this.jwts.createJwt(account);
  }

  profile(): Promise<ProfileResponseDto> {
    return {} as never;
  }
}
