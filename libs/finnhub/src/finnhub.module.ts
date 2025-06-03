import { ConfigurationModule } from '@libs/configuration';
import { Module } from '@nestjs/common';
import { FinnhubWebsocketsGateway } from './gateway/finnhub.gateway';
import { FinnhubService } from './service/finnhub.service';

@Module({
  imports: [ConfigurationModule],
  providers: [FinnhubService, FinnhubWebsocketsGateway],
  exports: [FinnhubService],
})
export class FinnhubModule {}
