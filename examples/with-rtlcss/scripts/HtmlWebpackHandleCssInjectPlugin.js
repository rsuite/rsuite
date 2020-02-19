class HtmlWebpackHandleCssInjectPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    const handleHtmlWebpackPluginAfterHtmlProcessing = data => {
      const { filter } = this.options;
      if (!filter) {
        return;
      }
      data.html = data.html.replace(/<link .+?>(?=(?:<.+?>)*<\/head>)/g, link => {
        const filePath = link.match(/(href=")(.*)" /)[2];
        return filter(filePath, link) ? link : '';
      });
      return new Promise(resolve => {
        resolve(data);
      });
    };

    if (compiler.hooks) {
      // webpack 4 support
      compiler.hooks.compilation.tap('htmlWebpackPluginAfterHtmlProcessing', compilation => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapPromise(
          'htmlWebpackPluginAfterHtmlProcessing',
          handleHtmlWebpackPluginAfterHtmlProcessing
        );
      });
    } else {
      // Hook into the html-webpack-plugin processing
      compiler.plugin('compilation', compilation => {
        compilation.plugin(
          'html-webpack-plugin-after-html-processing',
          handleHtmlWebpackPluginAfterHtmlProcessing
        );
      });
    }
  }
}

module.exports = HtmlWebpackHandleCssInjectPlugin;
