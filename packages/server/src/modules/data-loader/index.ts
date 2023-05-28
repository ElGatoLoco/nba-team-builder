import path from 'path';

import { AppCtx } from '../../utils/createAppContext';
import { PlayerEntity } from '../db/entities/player.entity';
import { StatisticEntity } from '../db/entities/statistic.entity';
import { transformPlayerDataRecord } from './transformers/transformPlayerDataRecord';
import { transformPlayerRecord } from './transformers/transformPlayerRecord';
import { transformStatRecord } from './transformers/transformStatRecord';
import { bulkInsert } from './utils/bulkInsert';
import { parseCSV } from './utils/parseCSV';

const CSV_DIR = path.resolve(process.cwd(), '../../raw-data');

export const loadData = async ({ db: { dataSource, repositories } }: AppCtx) => {
  const isAlreadyLoaded = (await repositories.player.count()) > 0;
  if (isAlreadyLoaded) {
    return;
  }

  await parseCSV(`${CSV_DIR}/Players.csv`, transformPlayerRecord, bulkInsert(dataSource, PlayerEntity));
  await parseCSV(
    `${CSV_DIR}/player_data.csv`,
    transformPlayerDataRecord,
    bulkInsert(dataSource, PlayerEntity, {
      conflictTargets: ['position', 'year_start', 'year_end'],
      overwrite: ['name', 'born'],
    }),
  );
  await parseCSV(`${CSV_DIR}/Seasons_Stats.csv`, transformStatRecord, bulkInsert(dataSource, StatisticEntity));
};
