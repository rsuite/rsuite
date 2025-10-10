'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "accordion", "defaultActiveKey", "bordered", "className", "classPrefix", "children", "activeKey", "onSelect"];
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
export var PanelGroupContext = /*#__PURE__*/React.createContext({});

/**
 * The `PanelGroup` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
var PanelGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('PanelGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    accordion = propsWithDefaults.accordion,
    defaultActiveKey = propsWithDefaults.defaultActiveKey,
    bordered = propsWithDefaults.bordered,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'panel-group' : _propsWithDefaults$cl,
    children = propsWithDefaults.children,
    activeProp = propsWithDefaults.activeKey,
    onSelect = propsWithDefaults.onSelect,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var _useControlled = useControlled(activeProp, defaultActiveKey),
    activeKey = _useControlled[0],
    setActiveKey = _useControlled[1];
  var classes = merge(className, withClassPrefix({
    accordion: accordion,
    bordered: bordered
  }));
  var handleSelect = useEventCallback(function (activeKey, event) {
    setActiveKey(activeKey);
    onSelect === null || onSelect === void 0 || onSelect(activeKey, event);
  });
  var contextValue = useMemo(function () {
    return {
      accordion: accordion,
      activeKey: activeKey,
      onGroupSelect: handleSelect
    };
  }, [accordion, activeKey, handleSelect]);
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement(PanelGroupContext.Provider, {
    value: contextValue
  }, children));
});
PanelGroup.displayName = 'PanelGroup';
PanelGroup.propTypes = {
  accordion: PropTypes.bool,
  activeKey: PropTypes.any,
  bordered: PropTypes.bool,
  defaultActiveKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func
};
export default PanelGroup;