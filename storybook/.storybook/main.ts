import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const Component = process.env.M;
const configDir = path.dirname(fileURLToPath(import.meta.url));

const stories = Component
  ? [`../../src/**/${Component}.stories.@(js|jsx|mjs|ts|tsx)`]
  : ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'];

const config: StorybookConfig = {
  stories: ['./welcome.mdx', '../../src/**/*.mdx', ...stories],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    'storybook-dark-mode'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(configDir, '../../tsconfig.json'),
      include: ['../src/**/*.tsx'],
      exclude: ['../src/**/test/**', '../src/**/stories/**']
    }
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [react()],
      resolve: {
        alias: [
          { find: '@/storybook/', replacement: path.resolve(configDir, '../') + '/' },
          {
            find: '@/internals/',
            replacement: path.resolve(configDir, '../../src/internals') + '/'
          }
        ],
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.scss']
      }
    });
  }
};
export default config;
