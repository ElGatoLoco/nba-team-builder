import GLPK, { LP } from 'glpk.js';

import type { PlayerRecord, SolverResponse } from './types';
import { getCombinedPositionsConstraints } from './utils/getCombinedPositionsConstraints';
import { getPointsLimitConstraint } from './utils/getPointsLimitConstraint';
import { getPositionConstraint } from './utils/getPositionConstraint';
import { parseResult } from './utils/parseResult';

const glpk = GLPK();

export type Solver = (playersData: PlayerRecord[], pointsLimit: number) => Promise<SolverResponse>;
type ConfigureSolver = () => Solver;
export const configureSolver: ConfigureSolver = () => async (playersData, pointsLimit) => {
  const perPositionVars = playersData.map(({ id, position, total_points }) => ({
    name: `${id}:${position}`,
    coef: total_points,
  }));

  const maximizerVars = playersData.map(({ id, position, age, total_games, total_points }) => ({
    name: `${id}:${position}`,
    coef: total_points - total_games * 0.00001 - age * 0.0000001,
  }));

  const pointsLimitConstraint = getPointsLimitConstraint(maximizerVars, glpk.GLP_UP, pointsLimit);
  const guardsConstraint = getPositionConstraint(glpk.GLP_FX, perPositionVars, 'G', 2);
  const forwardsConstraint = getPositionConstraint(glpk.GLP_FX, perPositionVars, 'F', 2);
  const centersConstraint = getPositionConstraint(glpk.GLP_FX, perPositionVars, 'C', 1);
  const combinedPositionsConstraints = getCombinedPositionsConstraints(maximizerVars, glpk.GLP_DB);

  const solver: LP = {
    name: 'OptimalTeam',
    objective: {
      direction: glpk.GLP_MAX,
      name: 'totalPoints',
      vars: maximizerVars,
    },
    subjectTo: [
      pointsLimitConstraint,
      guardsConstraint,
      forwardsConstraint,
      centersConstraint,
      ...combinedPositionsConstraints,
    ],
    binaries: perPositionVars.map(({ name }) => name),
  };

  const result = glpk.solve(solver, {
    msglev: glpk.GLP_MSG_OFF,
    presol: true,
    tmlim: 5,
  });

  return parseResult(result, playersData, perPositionVars);
};
