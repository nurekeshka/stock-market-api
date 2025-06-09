export interface SymbolsLookupResponse {
  count: number;
  result: SymbolResponse[];
}

export interface SymbolResponse {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}
