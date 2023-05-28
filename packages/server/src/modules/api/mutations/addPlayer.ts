import { InsertResult } from 'typeorm';

import { AddPlayerInput } from '../schemas/addPlayer.schema';
import { ApiRequest } from '../types';

export const addPlayer: ApiRequest<AddPlayerInput, InsertResult> = ({ ctx, input }) => {
  return ctx.appCtx.db.repositories.player.insert(input);
};
