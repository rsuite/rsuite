import { defineConfig, ViteUserConfig, coverageConfigDefaults } from 'vitest/config';
import { resolve } from 'path';

const { M, F, RUN_ENV, VITEST_RUNNING_POSTBUILD, BROWSER = 'chromium' } = process.env;
const nodeEnvironment = RUN_ENV === 'ssr' || RUN_ENV === 'browser-controls';

let testPatterns: string;
let testMainDescription: string;

if (RUN_ENV === 'ssr') {
  testPatterns = 'src/**/*.ssr.test.+(js|ts|tsx)';
  testMainDescription = `SSR tests: ${testPatterns}`;
} else if (RUN_ENV === 'browser-controls') {
  testPatterns = '{src,test/browser}/**/*.browser.test.+(js|ts|tsx)';
  testMainDescription = `Native browser control tests: ${testPatterns}`;
} else if (M) {
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
console.log('Node.js Version:', process.version);
console.log('Node.js Executable:', process.execPath);
console.log('npm Node.js Executable:', process.env.npm_node_execpath);
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
      include: [testPatterns],
      setupFiles: nodeEnvironment ? [] : ['vitest.setup.ts'],
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
  };

  if (VITEST_RUNNING_POSTBUILD === 'true') {
    if (config.test) {
      config.test.include = ['test/validateBuilds.spec.ts'];
      config.test.environment = 'node';
      config.test.browser = { enabled: false }; // Explicitly disable browser mode
    }
  } else if (nodeEnvironment) {
    if (config.test) {
      config.test.environment = 'node';
      config.test.browser = { enabled: false };
      if (RUN_ENV === 'browser-controls') config.test.fileParallelism = false;
      config.test.hookTimeout = 30000;
      config.test.testTimeout = 30000;
    }
  } else {
    // Default browser configuration for other test runs
    if (config.test) {
      const { trcTrustedResetClick, trcTrustedInputClick } = await import(
        './test/browser/toggleCommands'
      );
      const { setMotionPreference } = await import('./test/browser/motionCommands');
      const { createBrowserModuleDiagnostics } = await import(
        './test/browser/moduleLoadDiagnostics'
      );
      const { plugin, observeBrowserModuleLoads } = createBrowserModuleDiagnostics();
      config.plugins!.push(plugin);
      config.test.setupFiles = ['test/browser/moduleLoadDiagnostics.setup.ts', 'vitest.setup.ts'];
      config.test.browser = {
        enabled: true,
        provider: 'playwright',
        // Keep Firefox native focus and keyboard tests on one browser page at a time.
        fileParallelism: BROWSER === 'firefox' ? false : undefined,
        commands: {
          trcTrustedResetClick,
          trcTrustedInputClick,
          setMotionPreference,
          observeBrowserModuleLoads
        },
        instances: [
          {
            browser: BROWSER,
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
