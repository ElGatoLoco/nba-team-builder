import './loadEnv';

import { configureApi } from './modules/api';
import { loadData } from './modules/data-loader';
import { AppCtx, createAppContext } from './utils/createAppContext';
import { validateEnv } from './utils/validateEnv';

type Run = () => Promise<void>;
const run: Run = async () => {
  const ctx: AppCtx = await createAppContext();
  await loadData(ctx);
  configureApi(ctx);

  process.on('uncaughtException', (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
};

type Die = (error: unknown) => void;
const die: Die = (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(9);
};

validateEnv().then(run).catch(die);
