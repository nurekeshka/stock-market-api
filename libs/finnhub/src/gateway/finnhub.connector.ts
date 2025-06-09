import { Logger } from '@nestjs/common';
import {
  FinnhubWsDto,
  FinnhubWsReceiveDto,
  TradesAPIDto,
} from '../dtos/websockets.dto';

export type FinnhubTradesPublisher = (dto: TradesAPIDto) => void;

export class FinnhubWebsocketsConnector extends WebSocket {
  private readonly logger = new Logger(FinnhubWebsocketsConnector.name);
  private readonly symbols = new Set<string>();
  private readonly websocket: WebSocket;

  constructor(api: string, publish: FinnhubTradesPublisher) {
    super(api);
    this.logger.log('FinnhubWebsocketsConnector constructor called');

    this.addEventListener('open', () => {
      this.logger.log('Connection to Finnhub is open');
    });

    this.addEventListener('error', (e) => this.logger.error(e));

    this.addEventListener('close', () => {
      this.logger.warn('Closing connection to Finnhub');
    });

    this.addEventListener('message', (message: MessageEvent<string>) => {
      try {
        const data = JSON.parse(message.data) as FinnhubWsReceiveDto;

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
    const payload = JSON.stringify(event);
    this.logger.log(`Sending: ${payload}`);
    this.websocket.send(payload);
  }
}

function isTradesAPIDto(data: FinnhubWsReceiveDto): data is TradesAPIDto {
  return data.type === 'trade' && Array.isArray(data.data);
}
