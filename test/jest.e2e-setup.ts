import { CommonService } from '@libs/common';
import { closeServer } from '@libs/database';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { AppModule } from '../src/app.module';

export let app: INestApplication<never>;

beforeAll(async () => {
  const modules = await Test.createTestingModule({
    imports: [AppModule],
    providers: [],
  }).compile();

  app = modules.createNestApplication();
  CommonService.setup(app);
  app.useLogger(mock());
  await app.init();
});

afterAll(() => {
  void app.close();
  void closeServer();
});
