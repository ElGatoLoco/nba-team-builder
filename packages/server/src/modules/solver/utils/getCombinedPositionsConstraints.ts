import type { LP } from 'glpk.js';

type GetCombinedPositionsConstraints = (
  maximizerVars: { name: string; coef: number }[],
  type: number,
) => LP['subjectTo'];
export const getCombinedPositionsConstraints: GetCombinedPositionsConstraints = (maximizerVars, type) => {
  const combinedPositionConstraints: Record<string, LP['subjectTo'][number]> = {};
  maximizerVars.forEach(({ name }) => {
    const nameWithoutPosition = name.split(':')[0];
    const constraintName = `${nameWithoutPosition}Constraint`;

    if (!combinedPositionConstraints[constraintName]) {
      combinedPositionConstraints[constraintName] = {
        name: constraintName,
        vars: [],
        bnds: { type, ub: 1, lb: 0 },
      };
    }

    combinedPositionConstraints[constraintName].vars.push({ name, coef: 1 });
  });

  return Object.values(combinedPositionConstraints);
};
