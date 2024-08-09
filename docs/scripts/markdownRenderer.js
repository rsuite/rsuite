/* eslint-disable @typescript-eslint/no-var-requires */
const markdownRenderer = require('react-code-view/webpack-md-loader/renderer');
const kebabCase = require('lodash/kebabCase');

function getId(text) {
  text = text.replace(/[\(|\)|（|）]/gi, ' ');
  var id = kebabCase(text);

  return id;
}

const tsPrefixRegex = /<code>ts:(.*?)<\/code>/gi;
const ltCodeRegex = /(<code>.*?&lt;.*?<\/code>)/g;
const componentSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" fill="none"><g><path d="M0 3.75L6.5 7.5 13 3.75 6.5 0 0 3.75z" fill="#f58e9c"></path><path d="M6.5 7.5V15l6.5-3.75v-7.5L6.5 7.5z" fill="url(#paint_1_linear)"></path><path d="M0 11.25L6.5 15V7.5L0 3.75v7.5z" fill="#cf212d"></path></g><defs><linearGradient id="paint_1_linear" x1="13" y1="14.999" x2="3.254" y2="9.368"><stop stop-color="#cf212d"></stop><stop offset="1" stop-color="#870005"></stop></linearGradient></defs></svg>';
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
      return `${componentSvg}${p1}`;
    });

    return `
            <h${level} id="${id}" class="page-heading">
             <span class="page-heading-text">${title}</span>
             <a href="#${id}" class="page-heading-anchor" aria-hidden="true"><span aria-hidden="true">#</span></a>
            </h${level}>`;
  };
  return renderer;
};
