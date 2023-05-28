import '../loadEnv';

import { DataSource, MixedList } from 'typeorm';
import { z } from 'zod';

import { PlayerEntity } from '../modules/db/entities/player.entity';
import { StatisticEntity } from '../modules/db/entities/statistic.entity';

const MIN_ALLOWED_PORT = 1025;
const MAX_ALLOWED_PORT = 99999;

export const ormSchema = z.object({
  type: z.literal('postgres'),
  host: z.string(),
  port: z.coerce.number().min(MIN_ALLOWED_PORT).max(MAX_ALLOWED_PORT).optional(),
  database: z.string(),
  username: z.string(),
  password: z.string(),
  entities: z.array(z.string().or(z.function())),
  migrations: z.array(z.string()),
});

export const ormConfig = {
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  entities: [PlayerEntity, StatisticEntity] as MixedList<Function>,
  migrations: ['src/modules/db/migrations/**/*.ts'] as string[],
} as const;

export const dataSource = new DataSource(ormConfig);
