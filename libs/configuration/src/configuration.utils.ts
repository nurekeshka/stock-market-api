import { existsSync, promises } from 'fs';
import { resolve } from 'path';
import { ConfigurationEnum, environments } from './configuration.constants';
import { Configuration, Environments } from './configuration.interface';

export const directory = process.env.CONFIG_DIR ?? 'libs/configuration/configs';

export const env = process.env['NODE_ENV'] ?? 'dev';

export function validate(env: string | undefined): env is Environments {
  return environments.includes(env as Environments);
}

export async function config(
  name: ConfigurationEnum,
): Promise<Configuration | null> {
  const path = resolve(directory, `${name}.json`);
  if (!existsSync(path)) return null;

  const file = await promises.readFile(path, { encoding: 'utf-8' });
  return JSON.parse(file) as Configuration;
}
