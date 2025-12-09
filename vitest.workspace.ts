import { defineWorkspace } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults } from 'vitest/config';
import { resolve } from 'path';

export default defineWorkspace([
  // Browser tests - use the main config
  './vitest.config.ts',
  // SSR tests run in node environment (no browser mode)
  {
    base: './',
    define: {
      __DEV__: true
    },
    plugins: [tsconfigPaths({ ignoreConfigErrors: true }), react()],
    resolve: {
      alias: {
        '@test': resolve(__dirname, './test'),
        '@/internals': resolve(__dirname, './src/internals'),
        '@': resolve(__dirname, './src'),
        '@/storybook': resolve(__dirname, './storybook')
      }
    },
    test: {
      name: 'ssr-node',
      include: ['**/*.ssr.spec.{ts,tsx}'],
      setupFiles: ['vitest.setup.ts'],
      environment: 'node',
      coverage: {
        provider: 'istanbul',
        exclude: [
          ...coverageConfigDefaults.exclude,
          'docs/**',
          'examples/**',
          'storybook/**',
          'tooling/**',
          'src/**/stories/**',
          '**/*.js',
          '**/*.cjs'
        ]
      }
    }
  }
]);
