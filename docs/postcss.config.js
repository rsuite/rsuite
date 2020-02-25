/* eslint-disable @typescript-eslint/no-var-requires */
const { NODE_ENV, STYLE_DEBUG } = process.env;
const __PRO__ = NODE_ENV === 'production';

let plugins = [];

if (STYLE_DEBUG === 'STYLE' || __PRO__) {
  plugins = [
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComnments: {
            removeAll: false
          }
        }
      ]
    })
  ];
}

module.exports = {
  plugins
};
