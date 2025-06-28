import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tuyaApiMiddleware } from './server/tuya.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'tuya-proxy',
      configureServer(server) {
        server.middlewares.use(tuyaApiMiddleware());
      },
    },
  ],
});
