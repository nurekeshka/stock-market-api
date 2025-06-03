import { ConfigurationModule } from '@libs/configuration';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FinnhubController } from './controller/finnhub.controller';
import { FinnhubWebsocketsGateway } from './gateway/finnhub.gateway';
import { FinnhubService } from './service/finnhub.service';

@Module({
  imports: [
    ConfigurationModule,
    HttpModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: 'https://finnhub.io/api/v1',
        headers: {
          'X-Finnhub-Token': config.getOrThrow<string>('finnhub.key'),
        },
      }),
    }),
  ],
  providers: [FinnhubService, FinnhubWebsocketsGateway],
  controllers: [FinnhubController],
  exports: [FinnhubService],
})
export class FinnhubModule {}
