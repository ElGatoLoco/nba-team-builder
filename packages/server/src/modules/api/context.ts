import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { AppCtx } from '../../utils/createAppContext';

export const getCreateContext =
  (appCtx: AppCtx) =>
  async ({ req, res }: trpcNext.CreateNextContextOptions) => ({
    req,
    res,
    appCtx,
  });

export type TRPCContext = inferAsyncReturnType<ReturnType<typeof getCreateContext>>;
