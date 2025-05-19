import { Config } from 'jest';

const options: Config = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@libs/auth(|/.*)$': '<rootDir>/libs/auth/src/$1',
    '^@libs/common(|/.*)$': '<rootDir>/libs/common/src/$1',
    '^@libs/database(|/.*)$': '<rootDir>/libs/database/src/$1',
    '^@libs/finnhub-api(|/.*)$': '<rootDir>/libs/finnhub-api/src/$1',
    '^@libs/configuration(|/.*)$': '<rootDir>/libs/configuration/src/$1',
  },
  rootDir: '.',
  clearMocks: true,
  coveragePathIgnorePatterns: ['index.ts', 'main.ts'],
  roots: ['<rootDir>/src/', '<rootDir>/libs/'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default options;
