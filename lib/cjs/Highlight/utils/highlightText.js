'use client';
"use strict";

exports.__esModule = true;
exports.highlightText = highlightText;
var _utils = require("../../internals/utils");
function highlightText(text, props) {
  var query = props.query,
    renderMark = props.renderMark;
  if (!query || !text) {
    return text;
  }
  var queries = Array.isArray(query) ? query : [query];
  var regx = new RegExp(queries.map(function (q) {
    return (0, _utils.getSafeRegExpString)(q);
  }).join('|'), 'ig');
  var texts = [];
  var strArr = text.split(regx);
  var highStrArr = text.match(regx);
  for (var i = 0; i < strArr.length; i++) {
    if (strArr[i]) {
      texts.push(strArr[i]);
    }
    if (highStrArr !== null && highStrArr !== void 0 && highStrArr[i]) {
      texts.push(renderMark(highStrArr[i], i));
    }
  }
  return texts;
}