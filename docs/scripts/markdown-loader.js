const { transformMarkdownSync } = require('@react-code-view/core');
const createRenderer = require('./markdown-renderer');

module.exports = function markdownLoader(source) {
  const done = this.async();

  async function render() {
    const { getCodeHighlighter, renderHighlightedCode } = await import(
      '../utils/highlight-code.mjs'
    );
    const highlighter = await getCodeHighlighter();
    const renderer = createRenderer((code, language) =>
      renderHighlightedCode(highlighter, code, language)
    );
    const { html } = transformMarkdownSync(source, { markedOptions: { renderer } });

    return 'export default ' + JSON.stringify(html) + ';';
  }

  render().then(result => done(null, result), done);
};
