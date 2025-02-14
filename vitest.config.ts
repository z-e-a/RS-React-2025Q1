import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
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
          'src/__tests__/setup.ts',
        ],
      },
    },
  })
);
