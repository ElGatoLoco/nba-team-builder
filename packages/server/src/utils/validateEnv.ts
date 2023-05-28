import { z } from 'zod';

import { apiSchema } from '../config/api.config';
import { ormSchema } from '../config/orm.config';
import { Environment, environment } from '../environment';

type ValidateEnv = () => Promise<Environment>;
export const validateEnv: ValidateEnv = async () => {
  const envSchema = z.object({
    api: apiSchema,
    orm: ormSchema,
  });

  try {
    return envSchema.parse(environment);
  } catch (e) {
    if (e instanceof Error) {
      throw `INVALID ENVIRONMENT:  ${e.message}`;
    }
    throw String(e);
  }
};
