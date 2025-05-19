import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationEnum } from './configuration.constants';
import { config, env, validate } from './configuration.utils';

/**
 * @throws {Error} when the configuration file doesn't exist
 * @throws {Error} when the application is running on unsupported env
 */
export async function setup() {
  if (!validate(env)) throw Error('Application is running on unknown env.');

  const mode = env === 'test' ? ConfigurationEnum.test : ConfigurationEnum.base;
  const base = await config(mode);

  if (base === null) throw Error('Base configuration file is not there.');

  const local = await config(ConfigurationEnum.local);

  return {
    ...base,
    ...local,
    env,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [setup] }),
  ],
})
export class ConfigurationModule {}
