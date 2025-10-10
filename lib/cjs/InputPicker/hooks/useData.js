'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _utils = require("../../internals/utils");
function useData(props) {
  var _props$controlledData = props.controlledData,
    controlledData = _props$controlledData === void 0 ? [] : _props$controlledData,
    _props$cacheData = props.cacheData,
    cacheData = _props$cacheData === void 0 ? [] : _props$cacheData,
    onChange = props.onChange;
  var _useState = (0, _react.useState)(controlledData),
    uncontrolledData = _useState[0],
    setData = _useState[1];
  var _useState2 = (0, _react.useState)([]),
    newData = _useState2[0],
    setNewData = _useState2[1];
  var data = (0, _react.useMemo)(function () {
    return [].concat(uncontrolledData, newData);
  }, [newData, uncontrolledData]);
  var dataWithCache = (0, _react.useMemo)(function () {
    return [].concat(data, cacheData);
  }, [data, cacheData]);

  // Update the state when the data in props changes
  (0, _react.useEffect)(function () {
    if (controlledData && !(0, _utils.shallowEqual)(controlledData, uncontrolledData)) {
      setData(controlledData);
      setNewData([]);
      onChange === null || onChange === void 0 || onChange(controlledData);
    }
  }, [controlledData, uncontrolledData, onChange]);
  return {
    data: data,
    dataWithCache: dataWithCache,
    newData: newData,
    setNewData: setNewData
  };
}
var _default = exports.default = useData;