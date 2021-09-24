import reactRefresh from '@vitejs/plugin-react-refresh';

const PORT = 3000;

/**@type {import('vite').UserConfig} */
const publicConfig = {
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    assetsInlineLimit: 8 * 1024,
    outDir: 'build',
    assetsDir: 'assets',
    sourcemap: 'inline'
  }
};

export default ({ command, mode }) => {
  if (command === 'serve') {
    /**@type {import('vite').UserConfig} */
    return {
      ...publicConfig,
      define: {
        'process.env.RUN_ENV': JSON.stringify(''),
        'process.env.NODE_ENV': JSON.stringify('development')
      },
      server: {
        port: PORT
        // proxy
      }
    };
  } else {
    /**@type {import('vite').UserConfig} */
    return {
      ...publicConfig,
      define: {
        'process.env.RUN_ENV': JSON.stringify(''),
        'process.env.NODE_ENV': JSON.stringify('product')
      }
    };
  }
};
