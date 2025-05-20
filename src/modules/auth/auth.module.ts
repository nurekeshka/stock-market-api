import { ConfigurationModule } from '@libs/configuration';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { HashStrategy } from './strategies/hash.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

export function setup(config: ConfigService): JwtModuleOptions {
  return {
    secret: config.getOrThrow('auth.jwt.secret'),
    signOptions: { expiresIn: config.getOrThrow('auth.jwt.expiresIn') },
  };
}

@Module({
  imports: [
    AccountsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: setup,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, HashStrategy],
})
export class AuthModule {}
