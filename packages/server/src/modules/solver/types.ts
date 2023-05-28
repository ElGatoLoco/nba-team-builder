import type { GLPK } from 'glpk.js';

export type PlayerRecord = {
  id: string;
  name: string;
  born: number;
  position: 'G' | 'F' | 'C';
  age: number;
  total_games: number;
  total_points: number;
};
export type PickedPlayer = { name: string; position: string; totalPts: number };
export type SolverResponse = {
  team: PickedPlayer[];
  totalPoints: number;
};

type ValueOf<T> = T[keyof T];
// This really evaluates to number, but that's the consequence of loose typings of the lib
export type GLPKConstraintType = Extract<ValueOf<GLPK>, number>;
