import { Test, TestingModule } from '@nestjs/testing';
import { FinnhubApiService } from './finnhub-api.service';

describe('FinnhubApiService', () => {
  let service: FinnhubApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinnhubApiService],
    }).compile();

    service = module.get<FinnhubApiService>(FinnhubApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
