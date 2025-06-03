import { Logger } from '@nestjs/common';
import { FinnhubWsDto, TradesAPIDto } from '../dtos/websockets.dto';

export type FinnhubTradesPublisher = (dto: TradesAPIDto) => void;

export class FinnhubWebsocketsConnector extends WebSocket {
  private readonly logger = new Logger(FinnhubWebsocketsConnector.name);
  private readonly symbols = new Set<string>();

  constructor(api: string, publish: FinnhubTradesPublisher) {
    super(api);

    this.addEventListener('open', () =>
      this.logger.log('Connection to Finnhub is open'),
    );

    this.addEventListener('error', (e) => this.logger.error(e));
    this.addEventListener('close', () => {
      this.logger.warn('Closing connection to Finnhub');
      this.close();
    });

    this.addEventListener('message', (event: MessageEvent<string>) => {
      switch (event.type) {
        case 'message':
          return this.messageHandler(event);

        case 'trade':
          return this.tradeHandler(event, publish);

        default:
          return this.unknownHandler(event);
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

  private messageHandler(event: MessageEvent<string>): void {
    this.logger.log(`Message from Finnhub: ${event.data}`);
    this.pong();
  }

  private tradeHandler(
    event: MessageEvent<string>,
    publish: FinnhubTradesPublisher,
  ): void {
    this.logger.log(`Trade from Finnhub: ${event.data}`);
    publish(JSON.parse(event.data) as TradesAPIDto);
  }

  private unknownHandler(event: MessageEvent<string>): void {
    this.logger.warn(`Unknown event type: ${event.type}\n${event.data}`);
  }

  private pong(): void {
    this.next({ type: 'pong' });
  }

  private next(event: FinnhubWsDto): void {
    this.logger.log(`Next event sending: ${JSON.stringify(event)}`);
    this.send(JSON.stringify(event));
  }
}
