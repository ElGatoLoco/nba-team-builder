import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { Api, apiConfig } from './config/api.config';
import { ormConfig } from './config/orm.config';

export type Environment = {
  api: Api;
  orm: PostgresConnectionOptions;
};

export const environment: Environment = {
  api: apiConfig,
  orm: ormConfig,
};
