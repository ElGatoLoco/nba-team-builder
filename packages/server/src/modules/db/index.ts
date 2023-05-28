import { dataSource } from '../../config/orm.config';
import { PlayerEntity } from './entities/player.entity';
import { StatisticEntity } from './entities/statistic.entity';
import type { DB } from './types';

type InitDatabase = () => Promise<DB>;
export const initDatabase: InitDatabase = async () => {
  await dataSource.initialize();

  return {
    dataSource: dataSource,
    repositories: {
      player: dataSource.getRepository(PlayerEntity),
      statistic: dataSource.getRepository(StatisticEntity),
    },
  };
};
