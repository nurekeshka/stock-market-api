import { PaginateConfig } from 'nestjs-paginate';
import { environments } from './configuration.constants';

export type Environments = (typeof environments)[number];

export interface Configuration {
  env: Environments;
  auth: {
    jwt: {
      secret: string;
      expiresIn: string;
    };
  };
  database: {
    link: string;
    name: string;
  };
  pagination: PaginationConfigs;
  redis: {
    mock: boolean;
  };
}

export type PaginationConfigs = Pick<
  PaginateConfig<never>,
  | 'defaultLimit'
  | 'ignoreSearchByInQueryParam'
  | 'ignoreSelectInQueryParam'
  | 'loadEagerRelations'
  | 'maxLimit'
  | 'nullSort'
  | 'origin'
  | 'paginationType'
  | 'relativePath'
  | 'withDeleted'
>;
