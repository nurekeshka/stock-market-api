import { ConfigService } from '@nestjs/config';

import { MockProxy } from 'jest-mock-extended';
import { setup } from './database.module';
import { closeServer } from './in-memory.server';

describe('Database Module', () => {
  const configs = { getOrThrow: jest.fn() } as MockProxy<ConfigService>;

  it('should setup database config', async () => {
    configs.getOrThrow.mockReturnValue('');
    const options = await setup(configs);
    expect(options).toBeTruthy();
    void closeServer();
  });
});
