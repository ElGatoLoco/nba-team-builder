import { LP } from 'glpk.js';

type GetPointsLimitConstraint = (
  maximizerVars: { name: string; coef: number }[],
  type: number,
  pointsLimit: number,
) => LP['subjectTo'][number];
export const getPointsLimitConstraint: GetPointsLimitConstraint = (maximizerVars, type, pointsLimit) => {
  return {
    name: 'pointsLimit',
    vars: maximizerVars,
    bnds: { type: type, ub: pointsLimit, lb: 0 },
  };
};
