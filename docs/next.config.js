const path = require('path');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');

module.exports = withImages(
  withLess({
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              babel: false,
              symbolId: 'icon-[name]'
            }
          }
        ]
      });

      return config;
    },
    lessLoaderOptions: {
      javascriptEnabled: true
    }
  })
);
