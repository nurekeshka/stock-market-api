import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SymbolsLookupResponse } from '../dtos/api-responses.dto';

@Injectable()
export class FinnhubService {
  @Inject()
  private readonly http: HttpService;

  searchSymbols(
    q: string,
    exchange?: string,
  ): Observable<SymbolsLookupResponse> {
    return this.http
      .get<SymbolsLookupResponse>('search', { params: { q, exchange } })
      .pipe(map((response) => response.data));
  }
}
