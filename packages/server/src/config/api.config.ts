import { z } from 'zod';

const MIN_ALLOWED_PORT = 1025;
const MAX_ALLOWED_PORT = 99999;

export type Api = {
  port: number;
  clientOriginUrl: string;
  nodeEnv: 'development' | 'production';
};

export const apiSchema = z.object({
  port: z.number().min(MIN_ALLOWED_PORT).max(MAX_ALLOWED_PORT),
  clientOriginUrl: z.string().url(),
  nodeEnv: z.literal('development').or(z.literal('production')),
});

export const apiConfig: Api = {
  port: parseInt(process.env.API_PORT as string),
  clientOriginUrl: process.env.CLIENT_ORIGIN_URL as string,
  nodeEnv: (process.env.NODE_ENV || 'development') as Api['nodeEnv'],
};
