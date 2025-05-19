import { ConfigService } from '@nestjs/config';

import { MockProxy } from 'jest-mock-extended';
import { setup } from './database.module';

describe('Database Module', () => {
  const configs = { getOrThrow: jest.fn() } as MockProxy<ConfigService>;

  it('should setup database config', () => {
    configs.getOrThrow.mockReturnValue('');
    const options = setup(configs);
    expect(options).toBeTruthy();
  });
});
