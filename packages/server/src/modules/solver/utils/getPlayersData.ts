import type { DataSource } from 'typeorm';

import type { PlayerRecord } from '../types';

export const getPlayersData = (ds: DataSource) => {
  return ds.query<PlayerRecord[]>(`
  (
    SELECT
      p.id,
      p.name,
      p.born,
      p.position,
      MAX(s.age) as age,
      CAST(SUM(s.games_played) as INTEGER) as total_games,
      CAST(SUM(s.points) as INTEGER) AS total_points
    FROM
      players p
    INNER JOIN
      statistics s
        ON p.name = s.player_name
        AND s.season BETWEEN p.year_start AND p.year_end
        AND s.season - s.age - p.born <= 1
    WHERE length(p.position) = 1
      AND s.points IS NOT NULL
      AND p.deleted_at IS NULL
      AND p.position is NOT NULL
    GROUP BY
      p.id,
      p.name,
      p.born,
      p.position

    UNION

    SELECT
      p.id,
      p.name,
      p.born,
      substring(p.position, 1, 1) AS position,
      MAX(s.age) as age,
      CAST(SUM(s.games_played) as INTEGER) as total_games,
      CAST(SUM(s.points) as INTEGER) AS total_points
    FROM
      players p
    INNER JOIN
      statistics s
        ON p.name = s.player_name
        AND s.season BETWEEN p.year_start AND p.year_end
        AND s.season - s.age - p.born <= 1
    WHERE length(p.position) = 3
      AND s.points IS NOT NULL
      AND p.deleted_at IS NULL
      AND p.position is NOT NULL
    GROUP BY
      p.id,
      p.name,
      p.born,
      p.position

    UNION

    SELECT
      p.id,
      p.name,
      p.born,
      substring(p.position, 3, 1) AS position,
      MAX(s.age) as age,
      CAST(SUM(s.games_played) as INTEGER) as total_games,
      CAST(SUM(s.points) as INTEGER) AS total_points
    FROM
      players p
    INNER JOIN
      statistics s
        ON p.name = s.player_name
        AND s.season BETWEEN p.year_start AND p.year_end
        AND s.season - s.age - p.born <= 1
    WHERE length(p.position) = 3
      AND s.points IS NOT NULL
      AND p.deleted_at IS NULL
      AND p.position is NOT NULL
    GROUP BY
      p.id,
      p.name,
      p.position,
      p.born
  ) ORDER BY total_points DESC;
`);
};
