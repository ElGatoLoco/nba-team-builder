import { SolverResponse } from '../../solver/types';
import { getPlayersData } from '../../solver/utils/getPlayersData';
import { GenerateTeamInput } from '../schemas/generateTeam.schema';
import { ApiRequest } from '../types';

type GenerateTeam = ApiRequest<GenerateTeamInput, SolverResponse>;
export const generateTeam: GenerateTeam = async ({ ctx: { appCtx }, input }) => {
  const { db, solver } = appCtx;
  const playersData = await getPlayersData(db.dataSource);

  return solver(playersData, input.pts);
};
