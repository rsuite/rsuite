const plugins = [
  require('autoprefixer'),
  require('cssnano')({
    preset: [
      'default', {
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
