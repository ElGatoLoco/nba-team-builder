import { UpdateResult } from 'typeorm';

import { DeletePlayerInput } from '../schemas/deletePlayer.schema';
import { ApiRequest } from '../types';

export const deletePlayer: ApiRequest<DeletePlayerInput, UpdateResult> = ({ ctx, input }) => {
  return ctx.appCtx.db.repositories.player.softDelete(input);
};
