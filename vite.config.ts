import { searchForWorkspaceRoot,defineConfig } from 'vite';
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
  plugins: [
    react(),
  ],
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
