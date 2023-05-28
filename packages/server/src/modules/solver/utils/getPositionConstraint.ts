import type { LP } from 'glpk.js';

import { GLPKConstraintType, PlayerRecord } from '../types';

type GetPositionConstraint = (
  type: GLPKConstraintType,
  players: Pick<PlayerRecord, 'name'>[],
  position: PlayerRecord['position'],
  count: number,
) => LP['subjectTo'][number];
export const getPositionConstraint: GetPositionConstraint = (type, players, position, count) => ({
  name: `${position}Constraint`,
  vars: players.map(({ name }) => ({
    name,
    coef: name.endsWith(position) ? 1 : 0,
  })),
  bnds: { type, ub: count, lb: count },
});
