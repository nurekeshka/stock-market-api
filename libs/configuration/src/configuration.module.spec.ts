import * as fs from 'node:fs';
import { ConfigurationEnum } from './configuration.constants';
import { Configuration } from './configuration.interface';
import { setup } from './configuration.module';
import * as utils from './configuration.utils';

describe('Configuration Module', () => {
  const configuration: Partial<Configuration> = { env: 'test' };
  const raw = JSON.stringify(configuration);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw if unknown environment', async () => {
    const validateSpy = jest.spyOn(utils, 'validate').mockReturnValue(false);
    await expect(setup()).rejects.toThrow();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should setup configs properly', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileSpy = jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(raw);

    await expect(setup()).resolves.toStrictEqual(configuration);

    expect(existsSyncSpy).toHaveBeenCalledTimes(2);
    expect(readFileSpy).toHaveBeenCalledTimes(2);
  });

  it('should throw if config not there', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(setup()).rejects.toThrow();
    expect(existsSyncSpy).toHaveBeenCalledTimes(1);
  });

  it('should override configs', async () => {
    const configSpy = jest
      .spyOn(utils, 'config')
      .mockImplementation((name) =>
        name === ConfigurationEnum.test
          ? ({ redis: { mock: false } } as never)
          : ({ redis: { mock: true } } as never),
      );

    await expect(setup()).resolves.toStrictEqual({
      env: 'test',
      redis: { mock: true },
    });
    expect(configSpy).toHaveBeenCalledTimes(2);
  });
});
