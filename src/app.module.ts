import { ConfigurationModule } from '@libs/configuration';
import { DatabaseModule } from '@libs/database';
import { FinnhubModule } from '@libs/finnhub';
import { Module } from '@nestjs/common';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigurationModule,
    AuthModule,
    AccountsModule,
    FinnhubModule,
  ],
})
export class AppModule {}
