import { PaginateConfig } from 'nestjs-paginate';
import { environments } from './configuration.constants';

export type Environments = (typeof environments)[number];

export interface Configuration {
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
  finnhub: {
    key: string;
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
