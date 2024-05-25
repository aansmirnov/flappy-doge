import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: '',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    coverage: {
      provider: 'v8',
    },
    'deps.inline': ['vitest-canvas-mock'],
  },
  server: {
    port: 6969,
  },
});
