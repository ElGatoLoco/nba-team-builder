import { ILike, IsNull, Not } from 'typeorm';

import { PlayerEntity } from '../../db/entities/player.entity';
import { GetPlayersInput } from '../schemas/getPlayer.schema';
import { ApiRequest } from '../types';

const fields = [
  'id',
  'name',
  'position',
  'height',
  'weight',
  'college',
  'yearStart',
  'yearEnd',
  'born',
  'birthCity',
  'birthState',
] as const;
const select = fields.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});

export type PlayerResponse = Pick<PlayerEntity, (typeof fields)[number]>[];
type GetPlayers = ApiRequest<GetPlayersInput, [PlayerResponse, number]>;
export const getPlayers: GetPlayers = ({ ctx, input: { limit, skip, nameFilter } }) => {
  return ctx.appCtx.db.repositories.player.findAndCount({
    where: { yearStart: Not(IsNull()), deletedAt: IsNull(), name: ILike(`%${nameFilter || ''}%`) },
    select,
    order: {
      yearStart: 'DESC',
      id: 'ASC',
    },
    relations: {
      statistics: true,
    },
    take: limit ?? 25,
    skip: skip ?? 0,
  });
};
