import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const library = process.env.PICKER_LIBRARY;
if (!['rsuite', 'antd', 'chakra', 'heroui'].includes(library)) {
  throw new Error('PICKER_LIBRARY must identify one adapter');
}
export default defineConfig({
  root,
  base: './',
  plugins: library === 'heroui' ? [tailwindcss()] : [],
  resolve: {
    alias: { 'benchmark-adapter': path.join(root, 'src/adapters', library + '.tsx') }
  },
  define: { __LIBRARY__: JSON.stringify(library) },
  build: {
    outDir: path.join(root, 'dist', library),
    emptyOutDir: true,
    manifest: true,
    target: 'es2022'
  }
});
