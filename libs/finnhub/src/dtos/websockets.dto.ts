export interface SubscribeWsDto {
  type: 'subscribe';
  symbol: string;
}

export interface UnsubscribeWsDto {
  type: 'unsubscribe';
  symbol: string;
}

export interface PongWsDto {
  type: 'pong';
}

export type FinnhubWsDto = SubscribeWsDto | UnsubscribeWsDto | PongWsDto;

export class TradesAPIDto {
  type: 'trade';
  data: TradeData[];
}

export interface TradeData {
  s: string; // Symbol
  p: number; // Last price
  t: string; // UNIX milliseconds timestamp.
  v: number; // Volume
  c: number; // List of trade conditions. A comprehensive list of trade conditions code can be found
}
