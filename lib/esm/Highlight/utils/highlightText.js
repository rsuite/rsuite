'use client';
import { getSafeRegExpString } from "../../internals/utils/index.js";
export function highlightText(text, props) {
  var query = props.query,
    renderMark = props.renderMark;
  if (!query || !text) {
    return text;
  }
  var queries = Array.isArray(query) ? query : [query];
  var regx = new RegExp(queries.map(function (q) {
    return getSafeRegExpString(q);
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