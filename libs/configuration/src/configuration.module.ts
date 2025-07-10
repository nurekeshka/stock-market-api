import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { existsSync } from 'fs';
import { ConfigurationEnum } from './configuration.constants';
import { Configuration, Environments } from './configuration.interface';
import { config, env, scanfile, validate } from './configuration.utils';

/**
 * @throws {Error} when the configuration file doesn't exist
 * @throws {Error} when the application is running on unsupported env
 */
export async function setup(e: Environments = env): Promise<Configuration> {
  if (!validate(env)) throw Error('Application is running on unknown env.');

  switch (e) {
    case 'production':
    case 'dev': {
      const base = await config(ConfigurationEnum.base);
      if (base === null) throw Error('Base configuration file is not there.');

      const absolute = process.env['LOCAL_CONFIG_PATH'];
      if (absolute && existsSync(absolute)) {
        const local = await scanfile(absolute);
        return {
          ...base,
          ...local,
        };
      }

      const local = await config(ConfigurationEnum.local);

      return {
        ...base,
        ...local,
      };
    }

    case 'test': {
      const test = await config(ConfigurationEnum.test);
      if (test === null) throw Error('Test configuration file is not there.');
      return test;
    }
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [setup] }),
  ],
})
export class ConfigurationModule {}
