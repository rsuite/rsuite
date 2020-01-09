const withImages = require('next-images');
const markdown = require('react-markdown-reader');

const languages = ['javascript', 'bash', 'xml', 'css', 'less', 'json', 'diff', 'typescript'];

module.exports = withImages({
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader'
        },
        {
          loader: 'markdown-loader',
          options: {
            pedantic: true,
            renderer: markdown.renderer(languages)
          }
        }
      ]
    });
    return config;
  }
});
