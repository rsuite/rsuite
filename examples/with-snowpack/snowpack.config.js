const PORT = 3000;

/** @type {import('snowpack').CommandOptions } */
module.exports = {
  mount: {
    public: '/',
    src: '/assets',
    'node_modules/rsuite/lib/styles/fonts': { url: '/assets', static: true }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    [
      'snowpack-plugin-less',
      {
        javascriptEnabled: true
      }
    ]
  ],
  // server
  devOptions: {
    port: PORT
  },
  // proxy config
  // routes: []
};
