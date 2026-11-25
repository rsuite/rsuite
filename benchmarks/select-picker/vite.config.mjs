import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const repository = fileURLToPath(new URL('../../', import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  resolve: {
    alias: {
      'rsuite-benchmark/SelectPicker': repository + 'lib/esm/SelectPicker/index.js',
      'rsuite-benchmark/styles': repository + 'lib/dist/rsuite.min.css'
    },
    dedupe: ['react', 'react-dom']
  },
  build: {
    outDir: '.build',
    emptyOutDir: true,
    manifest: true
  },
  preview: {
    host: '127.0.0.1',
    port: 0
  }
});
