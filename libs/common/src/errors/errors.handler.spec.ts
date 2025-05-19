/* eslint-disable @typescript-eslint/unbound-method */
import { ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { MockProxy } from 'jest-mock-extended';
import { ErrorsHandler } from './errors.handler';

jest.mock('@nestjs/common', () => {
  const org: object = jest.requireActual('@nestjs/common');
  return {
    ...org,
    Logger: jest
      .fn()
      .mockImplementation(() => ({ constructor: jest.fn(), error: jest.fn() })),
  };
});

describe('Errors Handler', () => {
  const handler = new ErrorsHandler();

  const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const httpHostMock = {
    getResponse: jest.fn().mockReturnValue(responseMock),
  } as MockProxy<HttpArgumentsHost>;

  const host = {
    switchToHttp: jest.fn().mockReturnValue(httpHostMock),
  } as MockProxy<ArgumentsHost>;

  it('should handle errors: HttpException', () => {
    const exception = new HttpException('', 500);
    handler.catch(exception, host);
    expect(host.switchToHttp).toHaveBeenCalled();
  });

  it('should handle errors: HttpException with message', () => {
    const exception = new HttpException({}, 500);
    handler.catch(exception, host);
    expect(host.switchToHttp).toHaveBeenCalled();
  });

  it('should handle errors: Exception', () => {
    const exception = new Error('');
    handler.catch(exception, host);
    expect(host.switchToHttp).toHaveBeenCalled();
  });
});
