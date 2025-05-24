// @vitest-environment node

import { expect, it, describe } from 'vitest';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import flatten from 'lodash/flatten';
import { findResources } from '../scripts/proxyDirectories.js';

interface BuildJson {
  components?: Record<string, string>;
  proxy?: boolean;
}

const projectRoot = path.join(__dirname, '..');

const components: string[] = findResources({
  dir: path.join(projectRoot, 'src'),
  ignores: ['styles', 'internals']
});

function getChildComponents(): [string, string][] {
  const childComponents: [string, string][] = [];

  components.forEach(item => {
    const buildJsonPath = path.join(projectRoot, 'src', item, 'build.json');
    if (fs.existsSync(buildJsonPath)) {
      try {
        const buildJson: BuildJson = JSON.parse(fs.readFileSync(buildJsonPath, 'utf-8'));
        const { components: subComponents, proxy = true } = buildJson;
        if (proxy && subComponents) {
          childComponents.push(...Object.entries(subComponents));
        }
      } catch (error) {
        console.error(`Error parsing JSON from ${buildJsonPath}:`, error);
        // Optionally, rethrow or handle as a test failure
        throw new Error(`Failed to parse ${buildJsonPath}: ${(error as Error).message}`);
      }
    }
  });

  return childComponents;
}

interface FlattenProxyResourcesOptions {
  resources?: (string | [string, string])[];
  path?: string;
  hasIndexFile?: boolean;
}

function flattenProxyResources(options: FlattenProxyResourcesOptions): string[] {
  const { resources = [], path: basePath = '', hasIndexFile = true } = options;

  return flatten(
    resources.map(res => {
      const [resName, proxyResPath] = Array.isArray(res) ? res : [res, res as string];
      const filePath = hasIndexFile ? `${proxyResPath}/index` : proxyResPath;

      return [
        `lib${basePath}/${resName}/package.json`,
        `lib/cjs${basePath}/${filePath}.js`,
        `lib/esm${basePath}/${filePath}.js`,
        `lib/esm${basePath}/${filePath}.d.ts`,
        `lib/cjs${basePath}/${filePath}.d.ts`
      ];
    })
  );
}

const unstyledComponents: string[] = [
  'Schema',
  'DOMHelper',
  'Whisper',
  'SafeAnchor',
  'Affix',
  'internals',
  'CustomProvider',
  'locales',
  'MaskedInput'
];

const styledComponents: string[] = components.filter(
  i => !unstyledComponents.includes(i) && !/^use[A-Za-z]+/.test(i)
);

const locales: string[] = findResources({
  dir: path.join(projectRoot, 'src/locales'),
  ignores: ['index'],
  isFile: true
});

const filesToEnsureExistence: string[] = [
  // Validate dist
  'lib/dist/rsuite.js',
  'lib/dist/rsuite.min.js',
  'lib/dist/rsuite.css',
  'lib/dist/rsuite.min.css',
  'lib/dist/rsuite-no-reset.css',
  'lib/dist/rsuite-no-reset.min.css',
  'lib/dist/rsuite-rtl.css',
  'lib/dist/rsuite-rtl.min.css',
  'lib/dist/rsuite-no-reset-rtl.css',
  'lib/dist/rsuite-no-reset-rtl.min.css',

  // Validate docs
  'lib/CHANGELOG.md',
  'lib/README.md',
  'lib/LICENSE',
  'lib/package.json',

  // Validate less
  'lib/styles/index.less',
  'lib/styles/plugins/palette.js',
  ...styledComponents.map(i => `lib/${i}/styles/index.less`),

  // Validate components
  ...flattenProxyResources({ resources: components }),

  // Validate child components
  ...flattenProxyResources({
    resources: getChildComponents(),
    hasIndexFile: false
  }),

  // Validate locales
  ...flattenProxyResources({
    resources: locales,
    hasIndexFile: false,
    path: '/locales'
  })
];

describe('Build Validation Tests', () => {
  it('Ensure file existence', () => {
    filesToEnsureExistence.forEach(function ensureFileExistence(filePath) {
      const fullPath = path.join(projectRoot, filePath);
      expect(fs.existsSync(fullPath), `File ${filePath} should exist (${fullPath})`).toBe(true);
    });
  });

  it('Should enable Dark mode by default', () => {
    const cssPath = path.join(projectRoot, 'lib/dist/rsuite.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(/\.rs-theme-dark/.test(css), 'Dark mode styles should be included').toBe(true);
  });

  it('Prepends the `use client` directive to components', () => {
    const libfiles = glob.sync('lib/{cjs,esm}/**/*.js', { cwd: projectRoot });

    expect(libfiles.length).toBeGreaterThan(0); // Ensure glob found files

    libfiles.forEach(file => {
      const fullPath = path.join(projectRoot, file);
      const content = fs.readFileSync(fullPath, 'utf-8');
      expect(
        content.startsWith(`'use client';`),
        `File ${file} should have 'use client' directive`
      ).toBe(true);
    });
  });

  it('Should not include @/internals in d.ts files', () => {
    const dtsFiles = glob.sync('lib/{cjs,esm}/**/*.d.ts', { cwd: projectRoot });

    expect(dtsFiles.length).toBeGreaterThan(0); // Ensure glob found files

    dtsFiles.forEach(file => {
      const fullPath = path.join(projectRoot, file);
      const content = fs.readFileSync(fullPath, 'utf-8');
      expect(/@\/internals/.test(content), `File ${file} should not include @/internals`).toBe(
        false
      );
    });
  });
});
