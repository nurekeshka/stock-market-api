import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TradesAPIDto } from '../dtos/finnhub.dto';
import { FinnhubWebsocketsConnector } from './finnhub.connector';

@WebSocketGateway({ namespace: '/finnhub' })
export class FinnhubWebsocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  readonly server: Server;

  private readonly ws: FinnhubWebsocketsConnector;
  private readonly logger = new Logger(FinnhubWebsocketsGateway.name);

  // { client: Set<symbols> }
  private readonly subscriptions: Map<string, Set<string>> = new Map();

  constructor(configs: ConfigService) {
    const publishTrades = (dto: TradesAPIDto): void => {
      for (const [client, symbols] of this.subscriptions.entries()) {
        const trades = dto.data.filter((trade) => symbols.has(trade.s));
        this.server.to(client).emit('trades', trades);
        this.logger.log(`Publishing to ${client} `);
      }
    };

    this.ws = new FinnhubWebsocketsConnector(
      `wss://ws.finnhub.io?token=${configs.getOrThrow('finnhub.key')}`,
      publishTrades,
    );
  }

  handleConnection(client: Socket): void {
    this.subscriptions.set(client.id, new Set());
    this.logger.log(`Client ${client.id} has been connected`);
  }

  handleDisconnect(client: Socket): void {
    this.subscriptions.delete(client.id);
    this.logger.log(`Client "${client.id}" has been disconnected`);
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { symbol: string },
  ): void {
    const symbols = this.getSymbols(socket.id);

    symbols.add(data.symbol);
    this.ws.subscribe(data.symbol);

    this.logger.log(`Client "${socket.id}" is subscribing to ${data.symbol}`);
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { symbol: string },
  ): void {
    const symbols = this.getSymbols(socket.id);

    symbols.delete(data.symbol);
    this.cleanup(data.symbol);

    this.logger.log(
      `Client "${socket.id}" is unsubscribing from ${data.symbol}`,
    );
  }

  private cleanup(symbol: string): void {
    for (const symbols of this.subscriptions.values()) {
      if (symbols.has(symbol)) {
        return;
      }
    }

    this.ws.unsubscribe(symbol);
    this.logger.log(
      `Unsubscribing from ${symbol} as no clients are subscribed`,
    );
  }

  private getSymbols(client: string): Set<string> {
    const set = this.subscriptions.get(client);
    if (set) return set;
    this.subscriptions.set(client, new Set());
    return this.subscriptions.get(client) as Set<string>;
  }
}
