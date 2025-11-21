import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import * as sass from 'sass';

const Component = process.env.M;

const stories = Component
  ? [`../../src/**/${Component}.stories.@(js|jsx|mjs|ts|tsx)`]
  : ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'];

const config: StorybookConfig = {
  stories: ['./welcome.stories.mdx', '../../src/**/*.mdx', ...stories],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    '@storybook/addon-a11y',
    'storybook-dark-mode'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          { find: '@/storybook/', replacement: path.resolve(__dirname, '../') + '/' },
          {
            find: '@/internals/',
            replacement: path.resolve(__dirname, '../../src/internals') + '/'
          }
        ],
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.scss']
      },
      css: {
        preprocessorOptions: {
          scss: {
            // Use the new API instead of the old JS API
            implementation: sass
          }
        }
      },
      optimizeDeps: {
        exclude: ['chunk-NRQQNQ7F']
      }
    });
  }
};
export default config;
