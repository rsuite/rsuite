import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import next from '@next/eslint-plugin-next';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      next.configs['core-web-vitals']
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  }
]);
