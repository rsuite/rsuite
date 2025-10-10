'use client';
import { useState, useEffect, useMemo } from 'react';
import { shallowEqual } from "../../internals/utils/index.js";
function useData(props) {
  var _props$controlledData = props.controlledData,
    controlledData = _props$controlledData === void 0 ? [] : _props$controlledData,
    _props$cacheData = props.cacheData,
    cacheData = _props$cacheData === void 0 ? [] : _props$cacheData,
    onChange = props.onChange;
  var _useState = useState(controlledData),
    uncontrolledData = _useState[0],
    setData = _useState[1];
  var _useState2 = useState([]),
    newData = _useState2[0],
    setNewData = _useState2[1];
  var data = useMemo(function () {
    return [].concat(uncontrolledData, newData);
  }, [newData, uncontrolledData]);
  var dataWithCache = useMemo(function () {
    return [].concat(data, cacheData);
  }, [data, cacheData]);

  // Update the state when the data in props changes
  useEffect(function () {
    if (controlledData && !shallowEqual(controlledData, uncontrolledData)) {
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
export default useData;