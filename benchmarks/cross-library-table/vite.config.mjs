import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const library = process.env.TABLE_LIBRARY;
if (!['rsuite', 'antd', 'chakra', 'heroui'].includes(library)) throw new Error('Invalid adapter');
export default defineConfig({
  root,
  base: './',
  plugins: library === 'heroui' ? [tailwindcss()] : [],
  resolve: {
    alias: {
      'table-adapter': path.join(root, 'src/adapters', library + '.tsx'),
      'tree-adapter': path.join(root, 'src/tree/adapters', library + '.tsx'),
      'virtual-adapter': path.join(root, 'src/virtual/adapters', library + '.tsx')
    }
  },
  define: { __LIBRARY__: JSON.stringify(library) },
  build: {
    outDir: path.join(root, 'dist', library),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        index: path.join(root, 'index.html'),
        tree: path.join(root, 'tree.html'),
        virtual: path.join(root, 'virtual.html')
      }
    },
    target: 'es2022'
  }
});
