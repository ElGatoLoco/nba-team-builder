import { z } from 'zod';

export const deletePlayerInputSchema = z.object({
  id: z.string().uuid(),
});

export type DeletePlayerInput = z.infer<typeof deletePlayerInputSchema>;
