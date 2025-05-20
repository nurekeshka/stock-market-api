import { ConfigurationModule } from '@libs/configuration';
import { Test, TestingModule } from '@nestjs/testing';
import { FinnhubService } from './finnhub.service';

describe('FinnhubApiService', () => {
  let service: FinnhubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigurationModule],
      providers: [FinnhubService],
    }).compile();

    service = module.get<FinnhubService>(FinnhubService);
  });

  it('should be defined', () => {
    service.connect();
  });
});
