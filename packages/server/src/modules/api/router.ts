import { initTRPC } from '@trpc/server';

import type { TRPCContext } from './context';
import { addPlayer } from './mutations/addPlayer';
import { deletePlayer } from './mutations/deletePlayer';
import { generateTeam } from './queries/generateTeam';
import { getPlayers } from './queries/getPlayers';
import { playerSchema } from './schemas/addPlayer.schema';
import { deletePlayerInputSchema } from './schemas/deletePlayer.schema';
import { generateTeamSchema } from './schemas/generateTeam.schema';
import { getPlayersInputSchema } from './schemas/getPlayer.schema';

const { procedure, router } = initTRPC.context<TRPCContext>().create();

export const appRouter = router({
  generateTeam: procedure.input(generateTeamSchema).query(generateTeam),
  getPlayers: procedure.input(getPlayersInputSchema).query(getPlayers),
  addPlayer: procedure.input(playerSchema).mutation(addPlayer),
  deletePlayer: procedure.input(deletePlayerInputSchema).mutation(deletePlayer),
});

export type AppRouter = typeof appRouter;
