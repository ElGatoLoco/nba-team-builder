import { z } from 'zod';

export const playerSchema = z.object({
  name: z.string().min(2, { message: 'Name is required and has to be at least 2 characters long' }),
  position: z
    .string()
    .min(1, { message: 'Position is required and has to be at least 1 character long' })
    .max(3, { message: 'You sure the position is right?' }),
  height: z.coerce
    .number()
    .min(120, { message: 'Position is required and has to be at least 120' })
    .max(250, { message: "A bit too tall, isn't it?" }),
  weight: z.coerce
    .number()
    .min(35, { message: '(Almost) weightless?' })
    .max(250, { message: "Damn, that's too heavy" }),
  college: z.string().min(3, { message: "What's that one?" }),
  yearStart: z.coerce
    .number()
    .min(1950, { message: 'This field is required and has minimal value of 1950' })
    .max(new Date().getFullYear(), { message: "How do you know when he's gonna stop" }),
  yearEnd: z.coerce
    .number()
    .min(1950, { message: 'This field is required and has minimal value of 1950' })
    .max(new Date().getFullYear(), { message: "How do you know when he's gonna stop" }),
  born: z.coerce
    .number()
    .min(1900, { message: 'This field is required and has minimal value of 1900' })
    .max(new Date().getFullYear() - 15, { message: "Nice try. Children and unborns can't play in NBA" }),
  birthCity: z.string().min(3, { message: 'A city with such a short name?' }),
  birthState: z.string().min(3, { message: 'Full state name, please' }),
});

export type AddPlayerInput = z.infer<typeof playerSchema>;
