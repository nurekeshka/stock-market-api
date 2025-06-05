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

export interface TradeData {
  s: string; // Symbol
  p: number; // Price
  t: number; // Timestamp (milliseconds)
  v: number; // Volume
  c: number[]; // Trade condition codes
}

export interface TradesAPIDto {
  type: 'trade';
  data: TradeData[];
}

export interface PingDto {
  type: 'ping';
}

export interface ErrorDto {
  type: 'error';
  msg: string;
}

export type FinnhubWsReceiveDto = TradesAPIDto | PingDto | ErrorDto;
