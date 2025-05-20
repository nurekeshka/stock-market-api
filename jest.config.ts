import { Config } from 'jest';

const options: Config = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  clearMocks: true,
  coveragePathIgnorePatterns: ['index.ts', 'main.ts'],
  roots: ['<rootDir>/src/', '<rootDir>/libs/'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@libs/common(|/.*)$': '<rootDir>/libs/common/src/$1',
    '^@libs/database(|/.*)$': '<rootDir>/libs/database/src/$1',
    '^@libs/finnhub(|/.*)$': '<rootDir>/libs/finnhub/src/$1',
    '^@libs/configuration(|/.*)$': '<rootDir>/libs/configuration/src/$1',
  },
};

export function mergeConfigs(options: Config): Config {
  return { ...options, ...options };
}

export default options;
