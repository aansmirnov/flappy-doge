import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const base = process.env.BUILD_ENV === 'prod' ? '/flappy-doge/' : '/';

export default defineConfig({
  base,
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
    },
  },
  server: {
    port: 6969,
  },
});
