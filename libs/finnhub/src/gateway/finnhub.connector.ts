import { Logger } from '@nestjs/common';
import { WebSocket } from 'ws';
import {
  FinnhubWsDto,
  FinnhubWsReceiveDto,
  TradesAPIDto,
} from '../dtos/websockets.dto';

export type FinnhubTradesPublisher = (dto: TradesAPIDto) => void;

export class FinnhubWebsocketsConnector {
  private readonly logger = new Logger(FinnhubWebsocketsConnector.name);
  private readonly symbols = new Set<string>();
  private isOpen = false;
  private readonly websocket: WebSocket;

  constructor(api: string, publish: FinnhubTradesPublisher) {
    this.logger.log('FinnhubWebsocketsConnector constructor called');

    this.websocket = new WebSocket(api);

    this.websocket.on('open', () => {
      this.isOpen = true;
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

    this.websocket.on('error', (e) => this.logger.error(e));

    this.websocket.on('close', () => {
      this.logger.warn('Closing connection to Finnhub');
    });

    this.websocket.on('message', (raw) => {
      try {
        const data = JSON.parse(raw.toString()) as FinnhubWsReceiveDto;

        switch (data.type) {
          case 'trade':
            if (isTradesAPIDto(data)) {
              this.tradeHandler(data, publish);
            } else {
              this.logger.warn(
                `Invalid trade message: ${JSON.stringify(data)}`,
              );
            }
            break;

          case 'ping':
            this.logger.log('Ping received');
            this.pong();
            break;

          case 'error':
            this.logger.error(`Error from server: ${data.msg}`);
            break;

          default:
            this.messageHandler(data as FinnhubWsDto);
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

  private pong(): void {
    this.logger.log('Received ping, sending pong');
    this.next({ type: 'pong' });
  }

  private next(event: FinnhubWsDto): void {
    if (this.isOpen == true) {
      const payload = JSON.stringify(event);
      this.logger.log(`Sending: ${payload}`);
      this.websocket.send(payload);
    } else {
      this.logger.warn('WebSocket is not open. Cannot send message.');
    }
  }
}

function isTradesAPIDto(data: any): data is TradesAPIDto {
  return data.type === 'trade' && Array.isArray(data.data);
}
