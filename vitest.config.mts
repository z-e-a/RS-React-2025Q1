import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { loadEnvConfig } from '@next/env'
// loadEnvConfig(process.cwd())

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', 'packages/template/*'],
    environment: 'jsdom',
    globals: true,
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/*.ts?',
      ],
    },
  },
});
