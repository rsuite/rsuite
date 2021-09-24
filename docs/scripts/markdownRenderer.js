const markdown = require('react-markdown-reader');
const kebabCase = require('lodash/kebabCase');

function getId(text) {
  text = text.replace(/[\(|\)|（|）]/gi, ' ');
  var id = kebabCase(text);

  return id;
}

module.exports = function renderer(languages) {
  const renderer = markdown.renderer(languages);
  // Rewrite heading parsing for PageNav navigation
  renderer.heading = function (text, level) {
    var id = getId(text);

    return `
            <h${level} id="${id}" class="page-heading">
              <span class="page-heading-text">${text}</span>
              <a href="#${id}" class="page-heading-anchor" aria-hidden="true"><span aria-hidden="true">#</span></a>
            </h${level}>`;
  };
  return renderer;
};
