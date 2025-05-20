import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FinnhubService implements OnModuleDestroy {
  private readonly api = 'wss://ws.finnhub.io?token=';
  private readonly key = 'd0kqpohr01qn937mgulgd0kqpohr01qn937mgum0';

  private readonly socket: WebSocket;

  constructor(configs: ConfigService) {
    this.key = configs.getOrThrow('finnhub.key');
    this.socket = new WebSocket(this.api + this.key);
  }

  connect(): void {
    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }));
      this.socket.send(
        JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }),
      );
      this.socket.send(
        JSON.stringify({ type: 'subscribe', symbol: 'IC MARKETS:1' }),
      );
    });

    this.socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    });
  }

  unsubscribe(symbol: string): void {
    this.socket.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }));
  }

  onModuleDestroy(): void {
    this.socket.close();
  }
}
