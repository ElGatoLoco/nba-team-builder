import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '../../../server/src/modules/api/router';
import { environment } from '../config/environment';

export const tRPCClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: environment.apiUrl,
    }),
  ],
});
