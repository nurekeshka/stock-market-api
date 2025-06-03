import { Injectable } from '@nestjs/common';

@Injectable()
export class FinnhubService {
  private readonly subscriptions = new Map<string, Set<string>>();
}
