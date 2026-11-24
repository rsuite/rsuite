import { defineConfig, ViteUserConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'path';
import { normalizePath } from 'vite';

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
    // Concurrent browser runs must not replace each other's optimized chunks.
    cacheDir: resolve(__dirname, 'node_modules/.vite', BROWSER),
    define: {
      __DEV__: true
    },
    server: {
      // Keep Istanbul's synchronous uncovered-file instrumentation serial.
      preTransformRequests: false
    },
    // Unloaded benchmark CLIs must not prebundle Node-only tooling for browser coverage.
    optimizeDeps: {
      exclude: ['vite', 'playwright'],
      // Resolve test-only imports before execution so optimizer reloads cannot split React.
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-dom/server',
        'react-dom/server.browser',
        '@testing-library/react',
        '@testing-library/user-event',
        '@testing-library/jest-dom/vitest',
        '@rsuite/icons/AddOutline',
        '@rsuite/icons/Gear',
        '@rsuite/icons/Heart',
        '@rsuite/icons/Page',
        '@rsuite/icons/ArrowDown',
        '@rsuite/icons/Close',
        '@rsuite/icons/Icon',
        '@rsuite/icons/IconProvider',
        '@rsuite/icons/Search',
        'date-fns',
        'dom-lib',
        'dom-lib/addClass',
        'dom-lib/getAnimationEnd',
        'dom-lib/getHeight',
        'dom-lib/getScrollbarSize',
        'dom-lib/getStyle',
        'dom-lib/getWidth',
        'dom-lib/isOverflowing',
        'dom-lib/removeClass',
        'lodash/clone',
        'lodash/cloneDeep',
        'lodash/find',
        'lodash/findIndex',
        'lodash/isArray',
        'lodash/isNumber',
        'lodash/isString',
        'lodash/pickBy',
        'lodash/remove',
        'lodash/trim',
        'react-window',
        'tinycolor2'
      ]
    },
    plugins: [tsconfigPaths({ ignoreConfigErrors: true }), react()],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@test': resolve(__dirname, './test'),
        '@/internals': resolve(__dirname, './src/internals'),
        '@': resolve(__dirname, './src'),
        '@/storybook': resolve(__dirname, './storybook'),
        // Istanbul also transforms unloaded standalone benchmark fixtures.
        'rsuite-benchmark/SelectPicker': resolve(__dirname, './src/SelectPicker/index.tsx'),
        'rsuite-benchmark/styles': resolve(__dirname, './src/styles/index.scss')
      }
    },
    test: {
      include: [testPatterns],
      setupFiles: nodeEnvironment ? [] : ['vitest.setup.ts'],
      coverage: {
        provider: 'istanbul',
        // Preserve v3's unloaded-file coverage and exclusions after their defaults changed.
        include: ['**/*.{js,cjs,mjs,ts,mts,tsx,jsx,vue,svelte,marko,astro}'],
        // Anchor exclusions so a hidden parent directory does not exclude the project.
        exclude: [
          'coverage/**',
          'dist/**',
          // This standalone fixture installs its optional competitors separately.
          'benchmarks/cross-library-picker/**',
          'benchmarks/cross-library-form/**',
          'benchmarks/cross-library-table/**',
          '**/node_modules/**',
          '**/[.]**',
          'packages/*/test?(s)/**',
          '**/*.d.ts',
          '**/virtual:*',
          '**/__x00__*',
          '**/\\0*',
          'cypress/**',
          'test?(s)/**',
          'test?(-*).?(c|m)[jt]s?(x)',
          '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
          '**/__tests__/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
          '**/vitest.{workspace,projects}.[jt]s?(on)',
          '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
          'docs/**',
          'examples/**',
          'storybook/**',
          'tooling/**',
          'src/**/stories/**',
          '**/*.js',
          '**/*.cjs'
        ].map(pattern => normalizePath(__dirname) + '/' + pattern)
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
      // SSR files also start browsers or compile declarations. Avoid competing for CI resources.
      config.test.fileParallelism = false;
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
      const { setForcedColors } = await import('./test/browser/forcedColorsCommands');
      const { waitForBrowserTestFrame } = await import('./test/browser/testFrameReadiness');
      const { collectBrowserGarbage } = await import('./test/browser/garbageCollection');
      const { createBrowserModuleDiagnostics } = await import(
        './test/browser/moduleLoadDiagnostics'
      );
      const { plugin, observeBrowserModuleLoads } = createBrowserModuleDiagnostics();
      config.plugins!.push(plugin);
      config.test.setupFiles = [
        'test/browser/moduleLoadDiagnostics.setup.ts',
        'test/browser/testFrameReadiness.setup.ts',
        'test/browser/garbageCollection.setup.ts',
        'vitest.setup.ts'
      ];
      // Native focus and keyboard tests need one active browser page at a time.
      config.test.fileParallelism = false;
      config.test.browser = {
        enabled: true,
        provider: playwright({
          // Avoid Firefox's intermittent NS_ERROR_CORRUPTED_CONTENT on Vite's 304 responses.
          // Fetch component test modules without relying on the browser HTTP cache.
          launchOptions:
            BROWSER === 'firefox'
              ? {
                  firefoxUserPrefs: {
                    'browser.cache.disk.enable': false,
                    'browser.cache.memory.enable': false
                  }
                }
              : undefined
        }),
        orchestratorScripts: [
          { src: resolve(__dirname, 'test/browser/browserRPCClose.orchestrator.js') }
        ],
        commands: {
          trcTrustedResetClick,
          trcTrustedInputClick,
          setMotionPreference,
          setForcedColors,
          waitForBrowserTestFrame,
          collectBrowserGarbage,
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
