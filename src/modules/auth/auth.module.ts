import { ConfigurationModule } from '@libs/configuration';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

export function setup(config: ConfigService): JwtModuleOptions {
  return {
    secret: config.getOrThrow('auth.jwt.secret'),
    signOptions: { expiresIn: 'auth.jwt.expiresIn' },
  };
}

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: setup,
    }),
  ],
})
export class AuthModule {}
