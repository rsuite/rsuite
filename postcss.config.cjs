const plugins = [
  require('autoprefixer'),
  require('cssnano')({
    preset: [
      'default',
      {
        // Rounding unitless line-height ratios can shrink WebKit line boxes by 1px.
        calc: {
          precision: false
        },
        discardComments: {
          removeAll: true
        }
      }
    ]
  })
];

module.exports = {
  plugins
};
