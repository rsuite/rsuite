import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const { M, F, RUN_ENV } = process.env;

let testFiles = 'src/**/*.spec.+(js|ts|tsx)';

if (M) {
  testFiles = `src/${M}/test/*.spec.+(js|ts|tsx)`;
} else if (F) {
  testFiles = F;
}

console.group('Vitest Config');
console.log(`Run Environment: ${RUN_ENV}`);
console.log('Test Main:', testFiles);
console.groupEnd();

// Create a function to initialize the config
async function createConfig() {
  // Dynamically import ESM modules
  const reactModule = await import('@vitejs/plugin-react');
  const tsconfigPathsModule = await import('vite-tsconfig-paths');

  // Get the default exports
  const react = reactModule.default;
  const tsconfigPaths = tsconfigPathsModule.default;

  return defineConfig({
    define: {
      __DEV__: true
    },
    plugins: [tsconfigPaths(), react()],
    resolve: {
      alias: {
        '@test': resolve(__dirname, './test'),
        '@/internals': resolve(__dirname, './src/internals'),
        '@': resolve(__dirname, './src'),
        '@/storybook': resolve(__dirname, './storybook')
      }
    },
    test: {
      include: [testFiles],
      setupFiles: ['vitest.setup.ts'],
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [
          {
            browser: 'chromium',
            viewport: { width: 1280, height: 800 }
          }
        ]
      }
    }
  });
}

// Export the config
export default createConfig();
