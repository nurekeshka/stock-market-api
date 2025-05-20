import { ConfigurationModule } from '@libs/configuration';
import { Module } from '@nestjs/common';
import { FinnhubService } from './finnhub.service';

@Module({
  imports: [ConfigurationModule],
  providers: [FinnhubService],
  exports: [FinnhubService],
})
export class FinnhubModule {}
