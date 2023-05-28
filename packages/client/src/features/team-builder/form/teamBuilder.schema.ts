import { z } from 'zod';

export const GenerateTeamSchema = z.object({
  targetPoints: z.coerce
    .number()
    .min(100, { message: '100 points is the minimum value' })
    .max(300000, { message: '300,000 points is the maximum value' }),
});
export type GenerateTeamFormInput = z.infer<typeof GenerateTeamSchema>;
