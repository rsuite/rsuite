import { defineConfig, ViteUserConfig, coverageConfigDefaults } from 'vitest/config';
import { resolve } from 'path';

const { M, F, RUN_ENV, VITEST_RUNNING_POSTBUILD } = process.env;

let testPatterns: string;
let testMainDescription: string;

if (M) {
  testPatterns = `src/${M}/test/*.spec.+(js|ts|tsx)`;
  testMainDescription = `Module tests: ${testPatterns}`;
} else if (F) {
  testPatterns = F; // F is treated as a single file path or glob string
  testMainDescription = `Specific file/pattern: ${F}`;
} else {
  // Default for 'npm run test': only include tests from src directory
  testPatterns = 'src/**/*.spec.+(js|ts|tsx)';
  testMainDescription = `Default src patterns: ${testPatterns}`;
}

console.group('Vitest Config');
console.log(`Run Environment: ${RUN_ENV}`);
console.log('Test Main:', testMainDescription); // Updated log message
console.groupEnd();

// Create a function to initialize the config
async function createConfig() {
  // Dynamically import ESM modules
  const reactModule = await import('@vitejs/plugin-react');
  const tsconfigPathsModule = await import('vite-tsconfig-paths');

  // Get the default exports
  const react = reactModule.default;
  const tsconfigPaths = tsconfigPathsModule.default;

  const config: ViteUserConfig = {
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
      include: [testPatterns],
      setupFiles: ['vitest.setup.ts'],
      coverage: {
        provider: 'istanbul',
        exclude: [
          ...coverageConfigDefaults.exclude,
          'docs/**',
          'examples/**',
          'storybook/**',
          'src/**/stories/**',
          '**/*.js',
          '**/*.cjs'
        ]
      }
    }
  };

  if (VITEST_RUNNING_POSTBUILD === 'true') {
    if (config.test) {
      config.test.include = ['test/validateBuilds.spec.ts'];
      config.test.environment = 'node';
      config.test.browser = { enabled: false }; // Explicitly disable browser mode
    }
  } else {
    // Default browser configuration for other test runs
    if (config.test) {
      config.test.browser = {
        enabled: true,
        provider: 'playwright',
        instances: [
          {
            browser: 'chromium',
            viewport: { width: 1280, height: 800 }
          }
        ]
      };
    }
  }

  return defineConfig(config);
}

// Export the config
export default createConfig();
