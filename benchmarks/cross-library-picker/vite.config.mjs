import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { styleBuild, libraryStyles } from './runner/style-profiles.mjs';
import { moduleReport } from './runner/module-report.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const library = process.env.PICKER_LIBRARY;
if (!['rsuite', 'antd', 'chakra', 'heroui'].includes(library)) {
  throw new Error('PICKER_LIBRARY must identify one adapter');
}
const output = styleBuild(
  root,
  process.env.PICKER_STYLE_PROFILE || 'full',
  process.env.PICKER_STYLE_OUTPUT === '1'
);
const styles = libraryStyles(root, library, output.profile);
export default defineConfig({
  root,
  base: './',
  plugins: [
    ...(library === 'heroui' ? [tailwindcss()] : []),
    ...(output.separate ? [moduleReport(root)] : [])
  ],
  resolve: {
    alias: {
      'benchmark-adapter': path.join(root, 'src/adapters', library + '.tsx'),
      ...(styles.entry ? { 'benchmark-library-styles': styles.entry } : {})
    }
  },
  define: { __LIBRARY__: JSON.stringify(library) },
  build: {
    outDir: path.join(output.directory, library),
    emptyOutDir: true,
    manifest: true,
    target: 'es2022'
  }
});
