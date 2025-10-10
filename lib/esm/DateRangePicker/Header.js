'use client';
import React from 'react';
import { useClassNames } from "../internals/hooks/index.js";
import { compareAsc } from "../internals/utils/date/index.js";
import { FormattedDate } from "../CustomProvider/index.js";
import Button from "../Button/index.js";
function Header(props) {
  var _prefix;
  var _useClassNames = useClassNames('picker'),
    prefix = _useClassNames.prefix;
  var formatStr = props.formatStr,
    character = props.character,
    value = props.value,
    _props$activeKey = props.activeKey,
    activeKey = _props$activeKey === void 0 ? 'start' : _props$activeKey,
    clickable = props.clickable,
    onSelect = props.onSelect;
  var _ref = value !== null && value !== void 0 ? value : [null, null],
    startDate = _ref[0],
    endDate = _ref[1];
  var v = startDate && endDate ? [startDate, endDate].sort(compareAsc) : [startDate, endDate];
  var start = v[0] ? /*#__PURE__*/React.createElement(FormattedDate, {
    date: v[0],
    formatStr: formatStr
  }) : formatStr;
  var end = v[1] ? /*#__PURE__*/React.createElement(FormattedDate, {
    date: v[1],
    formatStr: formatStr
  }) : formatStr;
  return /*#__PURE__*/React.createElement("div", {
    className: prefix('daterange-header', (_prefix = {}, _prefix["tab-active-" + activeKey] = clickable, _prefix)),
    "data-testid": "daterange-header"
  }, clickable ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    size: "xs",
    appearance: "subtle",
    className: prefix('header-date'),
    onClick: function onClick() {
      return onSelect === null || onSelect === void 0 ? void 0 : onSelect('start');
    },
    "aria-label": "Select start date"
  }, start), /*#__PURE__*/React.createElement("span", {
    className: prefix('header-character')
  }, character), /*#__PURE__*/React.createElement(Button, {
    size: "xs",
    appearance: "subtle",
    className: prefix('header-date'),
    onClick: function onClick() {
      return onSelect === null || onSelect === void 0 ? void 0 : onSelect('end');
    },
    "aria-label": "Select end date"
  }, end)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: prefix('header-date')
  }, start), /*#__PURE__*/React.createElement("span", {
    className: prefix('header-character')
  }, character), /*#__PURE__*/React.createElement("span", {
    className: prefix('header-date')
  }, end)));
}
export default Header;