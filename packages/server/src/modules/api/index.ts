import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express, { Express } from 'express';

import { environment } from '../../environment';
import { AppCtx } from '../../utils/createAppContext';
import { getCreateContext } from './context';
import { appRouter } from './router';

export const configureApi = (ctx: AppCtx) => {
  const app: Express = express();

  app.use(
    cors({
      origin: environment.api.clientOriginUrl,
    }),
  );
  app.use(
    '/',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: getCreateContext(ctx),
    }),
  );

  app.listen(environment.api.port, async () => {
    // eslint-disable-next-line no-console
    console.log(`⚡️[server]: Server is running at http://localhost:${environment.api.port}`);
  });
};
