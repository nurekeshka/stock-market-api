import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { Model } from 'mongoose';
import { Account } from '../schemas/accounts.schema';
import { AccountsService } from './accounts.service';

describe('Accounts Service', () => {
  let service: AccountsService;
  let repository: jest.Mocked<Model<Account>>;

  const accountMock: Account = {
    username: '',
    email: '',
    password: '',
  } as never;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getModelToken(Account.name),
          useFactory: () => mock<Model<Account>>(),
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    repository = module.get(getModelToken(Account.name));
  });

  it('should throw if username exists', async () => {
    repository.exists.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(true),
    } as never);

    await expect(
      service.create({ username: 'test', email: '', password: '' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should create account if username does not exist', async () => {
    repository.exists.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(false),
    } as never);

    repository.create.mockResolvedValueOnce({
      username: 'test',
      email: '',
      password: '',
    } as never);

    const result = await service.create(accountMock);
    expect(result).toEqual(accountMock);
  });

  it('should return account by username', async () => {
    repository.findOne.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(accountMock),
    } as never);

    const result = await service.findOne('test');
    expect(result).toEqual(accountMock);
  });
});
