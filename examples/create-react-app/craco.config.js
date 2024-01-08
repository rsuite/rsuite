const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#f44336',
              '@primary-color-dark': '#f44336'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
