import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    envDir: path.join(__dirname, '../..'),
    envPrefix: 'PUBLIC_',
  };
});
