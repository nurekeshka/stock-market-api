import { existsSync, promises } from 'fs';
import { resolve } from 'path';
import { ConfigurationEnum, environments } from './configuration.constants';
import { Configuration, Environments } from './configuration.interface';

export const directory = process.env.CONFIG_DIR ?? 'libs/configuration/configs';

/* istanbul ignore next */
export const env = (process.env['NODE_ENV'] as Environments) ?? 'dev';

export function validate(env: string | undefined): env is Environments {
  return environments.includes(env as Environments);
}

export async function config(
  name: ConfigurationEnum,
): Promise<Configuration | null> {
  const path = resolve(directory, `${name}.json`);
  return scanfile(path);
}

export async function scanfile(path: string): Promise<Configuration | null> {
  const file = await promises.readFile(path, { encoding: 'utf-8' });
  if (!existsSync(path)) return null;
  return JSON.parse(file) as Configuration;
}
