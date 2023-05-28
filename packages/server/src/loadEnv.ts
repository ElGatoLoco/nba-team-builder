import path from 'path';

import dotenv from 'dotenv';

// Do not move this file elsewhere as it needs to load before everything else
dotenv.config({
  path: path.join(__dirname, '../../../', '.env'),
});
