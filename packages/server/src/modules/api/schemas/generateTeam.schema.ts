import { z } from 'zod';

export const generateTeamSchema = z.object({
  pts: z.coerce
    .number()
    .min(100, { message: '100 points is the minimum value' })
    .max(300000, { message: '300,000 points is the maximum value' }),
});

export type GenerateTeamInput = z.infer<typeof generateTeamSchema>;
