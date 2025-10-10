'use client';
import React from 'react';
import { useClassNames } from "../internals/hooks/index.js";
var IndentLine = function IndentLine() {
  var _useClassNames = useClassNames('tree'),
    prefix = _useClassNames.prefix;
  return /*#__PURE__*/React.createElement("span", {
    className: prefix('indent-line'),
    "data-testid": "indent-line"
  });
};
export default IndentLine;