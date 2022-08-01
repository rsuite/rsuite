const PORT = 3000;

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/assets' }
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
  }
  // proxy config
  // routes: []
};
