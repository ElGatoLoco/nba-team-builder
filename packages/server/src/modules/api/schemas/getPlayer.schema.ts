import { z } from 'zod';

export const getPlayersInputSchema = z.object({
  limit: z.number().min(1).max(100),
  skip: z.number().nullish(),
  nameFilter: z.string().nullish(),
});

export type GetPlayersInput = z.infer<typeof getPlayersInputSchema>;
