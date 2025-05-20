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

    expect(existsSyncSpy).toHaveBeenCalledTimes(1);
    expect(readFileSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if config not there', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(setup('dev')).rejects.toThrow();
    await expect(setup('production')).rejects.toThrow();
    await expect(setup('test')).rejects.toThrow();
    expect(existsSyncSpy).toHaveBeenCalledTimes(3);
  });

  it('should override configs', async () => {
    const configSpy = jest
      .spyOn(utils, 'config')
      .mockImplementation((name) =>
        name === ConfigurationEnum.test
          ? ({ redis: { mock: true } } as never)
          : ({ redis: { mock: false } } as never),
      );

    await expect(setup()).resolves.toStrictEqual({
      redis: { mock: true },
    });

    expect(configSpy).toHaveBeenCalledTimes(1);

    await expect(setup('dev')).resolves.toStrictEqual({
      redis: { mock: false },
    });

    expect(configSpy).toHaveBeenCalledTimes(3);
  });
});
