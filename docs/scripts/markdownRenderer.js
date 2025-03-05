/* eslint-disable @typescript-eslint/no-require-imports */
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
  '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"></path></svg>';

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
