import { Config } from 'jest';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '@libs/common': '<rootDir>/../libs/common/src',
    '@libs/database': '<rootDir>/../libs/database/src',
    '@libs/finnhub': '<rootDir>/../libs/finnhub/src',
    '@libs/configuration': '<rootDir>/../libs/configuration/src',
  },
} as Config;
