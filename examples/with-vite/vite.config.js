import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = 3000;

// If you want to run directly in the rsuite project, you need to delete the postcss.config.js file in the root directory
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});
