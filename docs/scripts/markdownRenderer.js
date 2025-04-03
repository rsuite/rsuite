const markdownRenderer = require('react-code-view/webpack-md-loader/renderer');
const kebabCase = require('lodash/kebabCase');

function getId(text) {
  text = text.replace(/[\(|\)|（|）]/gi, ' ');
  var id = kebabCase(text);

  return id;
}

function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

const tsPrefixRegex = /<code>ts:(.*?)<\/code>/gi;
const ltCodeRegex = /(<code>.*?&lt;.*?<\/code>)/g;
const componentSvg =
  '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v76a4,4,0,0,0,4,4H212a4,4,0,0,0,4-4V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Zm62.51,68.65L197.83,180l16.68,23.35a8,8,0,0,1-13,9.3L188,193.76l-13.49,18.89a8,8,0,1,1-13-9.3L178.17,180l-16.68-23.35a8,8,0,0,1,2.3-11.46,8.19,8.19,0,0,1,10.88,2.38L188,166.24l13.49-18.89a8,8,0,0,1,13,9.3Zm-66.7,39.66a20.82,20.82,0,0,1-9.19,15.23C133.43,215,127,216,121.13,216A60.43,60.43,0,0,1,106,214a8,8,0,1,1,4.3-15.41c4.38,1.21,15,2.71,19.55-.35.88-.6,1.83-1.52,2.14-3.93.34-2.67-.72-4.1-12.78-7.59-9.35-2.7-25-7.23-23-23.12a20.58,20.58,0,0,1,9-14.94c11.85-8,30.72-3.31,32.84-2.76a8,8,0,0,1-4.07,15.48c-4.49-1.17-15.23-2.56-19.83.56a4.54,4.54,0,0,0-2,3.67c-.12.9-.14,1.08,1.11,1.9,2.31,1.49,6.45,2.68,10.45,3.84C133.49,174.17,150,179,147.81,196.31ZM88,152.53A8.18,8.18,0,0,1,79.73,160H68v47.72A8.18,8.18,0,0,1,60.53,216,8,8,0,0,1,52,208V160H40.27A8.18,8.18,0,0,1,32,152.53,8,8,0,0,1,40,144H80A8,8,0,0,1,88,152.53Z"></path></svg>';
const tsSvg =
  '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v76a4,4,0,0,0,4,4H164a4,4,0,0,1,4,4V228a4,4,0,0,0,4,4h28a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Zm-4.19,108.31a20.82,20.82,0,0,1-9.19,15.23C133.43,215,127,216,121.13,216A61.14,61.14,0,0,1,106,214a8,8,0,1,1,4.3-15.41c4.38,1.2,15,2.7,19.55-.36.88-.59,1.83-1.52,2.14-3.93.35-2.67-.71-4.1-12.78-7.59-9.35-2.7-25-7.23-23-23.11a20.56,20.56,0,0,1,9-14.95c11.84-8,30.71-3.31,32.83-2.76a8,8,0,0,1-4.07,15.48c-4.49-1.17-15.23-2.56-19.83.56a4.54,4.54,0,0,0-2,3.67c-.12.9-.14,1.09,1.11,1.9,2.31,1.49,6.45,2.68,10.45,3.84C133.49,174.17,150.05,179,147.81,196.31ZM88,152.53A8.17,8.17,0,0,1,79.73,160H68v47.73A8.17,8.17,0,0,1,60.53,216,8,8,0,0,1,52,208V160H40.27A8.17,8.17,0,0,1,32,152.53,8,8,0,0,1,40,144H80A8,8,0,0,1,88,152.53Z"></path></svg>';

module.exports = function renderer(languages) {
  const renderer = markdownRenderer(languages);
  // Rewrite heading parsing for PageNav navigation
  renderer.heading = function (htmlString, level) {
    var id = getId(htmlString);

    let title = htmlString.replace(tsPrefixRegex, (_match, p1) => {
      return `${tsSvg}<code>${p1}</code>`;
    });

    title = title.replace(ltCodeRegex, (_match, p1) => {
      /**
       * p1: <code>&lt;CheckTree&gt;</code>
       * Determine if the first character is an uppercase letter, if so, it is a component.
       */
      if (isUpperCase(p1[10])) {
        return `${componentSvg}${p1}`;
      }

      return p1;
    });

    return `
            <h${level} id="${id}" class="page-heading">
             <span class="page-heading-text">${title}</span>
             <a href="#${id}" class="page-heading-anchor" aria-hidden="true"><span aria-hidden="true">#</span></a>
            </h${level}>`;
  };
  return renderer;
};
