'use client';
import React from 'react';
var toJSX = function toJSX(node, key) {
  return typeof node !== 'undefined' ? /*#__PURE__*/React.createElement("span", {
    key: key
  }, node) : null;
};

/**
 * Transforms a pattern string by replacing placeholders with corresponding data values.
 *
 * @example
 * tplTransform('Show {0} data', <i>100</i>);
 * // output: Show <span><i>100</i></span> data
 */
export function tplTransform(pattern) {
  for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    data[_key - 1] = arguments[_key];
  }
  return pattern.split(/\{(\d+)\}/).map(function (item, index) {
    return index % 2 ? toJSX(data[+item], index) : toJSX(item, index);
  }).filter(function (item) {
    return item !== '';
  });
}
export default tplTransform;