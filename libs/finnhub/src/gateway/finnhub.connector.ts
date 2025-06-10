import { Logger } from '@nestjs/common';
import { RawData, WebSocket } from 'ws';
import {
  FinnhubWsDto,
  FinnhubWsReceiveDto,
  TradesAPIDto,
} from '../dtos/websockets.dto';
export type FinnhubTradesPublisher = (dto: TradesAPIDto) => void;

export class FinnhubWebsocketsConnector extends WebSocket {
  private readonly logger = new Logger(FinnhubWebsocketsConnector.name);
  private readonly symbols = new Set<string>();

  constructor(api: string, publish: FinnhubTradesPublisher) {
    super(api);
    this.logger.log('FinnhubWebsocketsConnector constructor called');

    this.on('open', () => {
      this.logger.log('Connection to Finnhub is open');

      const symbolsToSubscribe = [
        'AAPL',
        'GOOGL',
        'MSFT',
        'AMZN',
        'TSLA',
        'FB',
        'NFLX',
        'NVDA',
        'BABA',
        'INTC',
        'ORCL',
        'CSCO',
        'ADBE',
        'PYPL',
        'CRM',
        'AMD',
        'SQ',
        'UBER',
        'TWTR',
        'SHOP',
        'SPOT',
        'V',
        'MA',
        'DIS',
        'BAC',
        'WMT',
        'T',
        'KO',
        'PEP',
        'NKE',
        'XOM',
        'CVX',
        'JNJ',
        'PFE',
        'MRK',
        'ABBV',
        'COST',
        'MCD',
        'QCOM',
        'TXN',
        'IBM',
        'GS',
        'JPM',
        'BA',
        'CAT',
        'GM',
        'F',
        'GE',
        'GM',
        'NIO',
        'BINANCE:BTCUSDT',
        'IC MARKETS:1',
      ];

      symbolsToSubscribe.forEach((symbol) => {
        this.subscribe(symbol);
      });
    });

    this.on('error', (e) => this.logger.error(e));

    this.on('close', () => {
      this.logger.warn('Closing connection to Finnhub');
    });

    this.on('message', (message: RawData) => {
      try {
        const data = JSON.parse(message.toString()) as FinnhubWsReceiveDto;

        switch (data.type) {
          case 'trade':
            if (isTradesAPIDto(data)) {
              return this.tradeHandler(data, publish);
            } else {
              return this.logger.warn(
                `Invalid trade message: ${JSON.stringify(data)}`,
              );
            }

          case 'ping':
            this.logger.log('Ping received');
            return this.pong();

          case 'error':
            return this.logger.error(`Error from server: ${data.msg}`);

          default:
            return this.messageHandler(data as FinnhubWsDto);
        }
      } catch (e) {
        this.logger.error('JSON parse error:', e);
      }
    });
  }

  subscribe(symbol: string): void {
    if (this.symbols.has(symbol)) return;
    this.next({ type: 'subscribe', symbol });
    this.symbols.add(symbol);
  }

  unsubscribe(symbol: string): void {
    if (!this.symbols.has(symbol)) return;
    this.next({ type: 'unsubscribe', symbol });
    this.symbols.delete(symbol);
  }

  private messageHandler(data: FinnhubWsDto): void {
    this.logger.log(`Unhandled message: ${JSON.stringify(data)}`);
  }

  private tradeHandler(
    data: TradesAPIDto,
    publish: FinnhubTradesPublisher,
  ): void {
    this.logger.log(`Trade: ${JSON.stringify(data)}`);
    publish(data);
  }

  private next(event: FinnhubWsDto): void {
    const payload = JSON.stringify(event);
    this.logger.log(`Sending: ${payload}`);
    this.send(payload);
  }
}

function isTradesAPIDto(data: FinnhubWsReceiveDto): data is TradesAPIDto {
  return data.type === 'trade' && Array.isArray(data.data);
}
