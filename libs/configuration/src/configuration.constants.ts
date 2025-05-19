export const environments = ['production', 'test', 'dev'] as const;

export enum ConfigurationEnum {
  base = 'base',
  local = 'local',
  test = 'test',
}
