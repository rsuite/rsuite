'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["disabled", "limitOptions", "locale", "limit", "onChangeLimit", "size", "prefix"];
import React, { useRef } from 'react';
import SelectPicker from "../SelectPicker/index.js";
import { tplTransform } from "../internals/utils/index.js";
var LimitPicker = function LimitPicker(props) {
  var disabled = props.disabled,
    limitOptions = props.limitOptions,
    locale = props.locale,
    limit = props.limit,
    onChangeLimit = props.onChangeLimit,
    size = props.size,
    prefix = props.prefix,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var containerRef = useRef(null);
  var disabledPicker = typeof disabled === 'function' ? disabled('picker') : Boolean(disabled);
  var formatlimitOptions = limitOptions.map(function (item) {
    return {
      value: item,
      label: locale.limit && tplTransform(locale.limit, item)
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    className: prefix('limit'),
    ref: containerRef
  }, /*#__PURE__*/React.createElement(SelectPicker, _extends({}, rest, {
    size: size,
    cleanable: false,
    searchable: false,
    placement: "topStart",
    data: formatlimitOptions,
    value: limit,
    onChange: onChangeLimit,
    menuStyle: {
      minWidth: 'auto'
    },
    disabled: disabledPicker,
    container: function container() {
      return containerRef.current;
    }
  })));
};
export default LimitPicker;