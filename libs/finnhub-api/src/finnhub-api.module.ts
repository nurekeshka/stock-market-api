import { Module } from '@nestjs/common';
import { FinnhubApiService } from './finnhub-api.service';

@Module({
  providers: [FinnhubApiService],
  exports: [FinnhubApiService],
})
export class FinnhubApiModule {}
