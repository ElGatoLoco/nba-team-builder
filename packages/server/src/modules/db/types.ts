import { DataSource, Repository } from 'typeorm';

import { PlayerEntity } from './entities/player.entity';
import { StatisticEntity } from './entities/statistic.entity';

type Repositories = Record<'player', Repository<PlayerEntity>> & Record<'statistic', Repository<StatisticEntity>>;

export type DB = {
  dataSource: DataSource;
  repositories: Repositories;
};
