import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SymbolResponse } from '../dtos/api-responses.dto';
import { FinnhubService } from '../service/finnhub.service';

@Controller('finnhub')
export class FinnhubController {
  @Inject()
  private readonly service: FinnhubService;

  @Get('symbols')
  searchSymbols(
    @Query('query') query: string,
    @Query('exchange') exchange?: string,
  ): Observable<SymbolResponse[]> {
    return this.service.searchSymbols(query, exchange);
  }
}
