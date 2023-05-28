import { Result } from 'glpk.js';

import { PickedPlayer, PlayerRecord, SolverResponse } from '../types';

type ParseResult = (
  result: Result,
  playersData: PlayerRecord[],
  perPositionVars: { name: string; coef: number }[],
) => SolverResponse;
export const parseResult: ParseResult = (result, playersData, perPositionVars) => {
  const team = Object.entries(result.result.vars).reduce((acc: PickedPlayer[], [, val], idx: number) => {
    if (val === 1) {
      const [id, position] = perPositionVars[idx].name.split(':');
      const { name, total_points: totalPts } = playersData.find((p) => p.id === id) as PlayerRecord;

      return [
        ...acc,
        {
          name,
          position,
          totalPts,
        },
      ];
    }

    return acc;
  }, []);

  const totalPoints = team.reduce((acc, curr) => acc + curr.totalPts, 0);

  return {
    team,
    totalPoints,
  };
};
