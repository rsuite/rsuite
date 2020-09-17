const markdown = require('react-markdown-reader');

module.exports = function renderer(languages) {
  const renderer = markdown.renderer(languages);
  // 重写 heading 解析用于 PageNav 导航
  renderer.heading = function(text, level) {
    return `<h${level} id="${encodeURIComponent(text)}">${text}</h${level}>\r\n`;
  };
  return renderer;
};
