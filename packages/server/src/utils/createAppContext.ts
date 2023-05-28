import { initDatabase } from '../modules/db';
import { DB } from '../modules/db/types';
import { Solver, configureSolver } from '../modules/solver';

export type AppCtx = {
  db: DB;
  solver: Solver;
};

type CreateAppContext = () => Promise<AppCtx>;
export const createAppContext: CreateAppContext = async () => {
  const db = await initDatabase();
  const solver = configureSolver();

  return {
    db,
    solver,
  };
};
