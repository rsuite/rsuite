'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "bodyFill", "bodyProps", "bordered", "children", "className", "classPrefix", "caretAs", "collapsible", "defaultExpanded", "disabled", "eventKey", "expanded", "header", "headerRole", "panelRole", "shaded", "scrollShadow", "id", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "onSelect"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PanelHeader from "./PanelHeader.js";
import PanelBody from "./PanelBody.js";
import useExpanded from "./hooks/useExpanded.js";
import { useClassNames, useUniqueId, useEventCallback } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { PanelGroupContext } from "../PanelGroup/index.js";
/**
 * The `Panel` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
var Panel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Panel', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    bodyFill = propsWithDefaults.bodyFill,
    bodyProps = propsWithDefaults.bodyProps,
    bordered = propsWithDefaults.bordered,
    children = propsWithDefaults.children,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'panel' : _propsWithDefaults$cl,
    caretAs = propsWithDefaults.caretAs,
    collapsibleProp = propsWithDefaults.collapsible,
    defaultExpanded = propsWithDefaults.defaultExpanded,
    disabled = propsWithDefaults.disabled,
    eventKey = propsWithDefaults.eventKey,
    expandedProp = propsWithDefaults.expanded,
    header = propsWithDefaults.header,
    headerRole = propsWithDefaults.headerRole,
    _propsWithDefaults$pa = propsWithDefaults.panelRole,
    panelRole = _propsWithDefaults$pa === void 0 ? 'region' : _propsWithDefaults$pa,
    shaded = propsWithDefaults.shaded,
    scrollShadow = propsWithDefaults.scrollShadow,
    idProp = propsWithDefaults.id,
    onEnter = propsWithDefaults.onEnter,
    onEntered = propsWithDefaults.onEntered,
    onEntering = propsWithDefaults.onEntering,
    onExit = propsWithDefaults.onExit,
    onExited = propsWithDefaults.onExited,
    onExiting = propsWithDefaults.onExiting,
    onSelect = propsWithDefaults.onSelect,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var id = useUniqueId('rs-', idProp);
  var bodyId = id + "-panel";
  var buttonId = id + "-btn";
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _ref = useContext(PanelGroupContext) || {},
    onGroupSelect = _ref.onGroupSelect;
  var _useExpanded = useExpanded({
      expanded: expandedProp,
      defaultExpanded: defaultExpanded,
      eventKey: eventKey,
      collapsible: collapsibleProp
    }),
    expanded = _useExpanded[0],
    setExpanded = _useExpanded[1],
    collapsible = _useExpanded[2];
  var handleSelect = useEventCallback(function (event) {
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    onGroupSelect === null || onGroupSelect === void 0 || onGroupSelect(eventKey, event);
    setExpanded(!expanded);
  });
  var classes = merge(className, withClassPrefix({
    in: expanded,
    collapsible: collapsible,
    bordered: bordered,
    shaded: shaded
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    id: idProp
  }), header && /*#__PURE__*/React.createElement(PanelHeader, {
    collapsible: collapsible,
    expanded: expanded,
    caretAs: caretAs,
    role: headerRole,
    buttonId: buttonId,
    bodyId: bodyId,
    disabled: disabled,
    onClickButton: handleSelect
  }, header), /*#__PURE__*/React.createElement(PanelBody, _extends({
    collapsible: collapsible,
    expanded: expanded,
    bodyFill: bodyFill,
    role: panelRole,
    id: bodyId,
    scrollShadow: scrollShadow,
    labelId: buttonId,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited
  }, bodyProps), children));
});
Panel.displayName = 'Panel';
Panel.propTypes = {
  collapsible: PropTypes.bool,
  bordered: PropTypes.bool,
  shaded: PropTypes.bool,
  bodyFill: PropTypes.bool,
  header: PropTypes.any,
  defaultExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  eventKey: PropTypes.any,
  panelRole: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onSelect: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  className: PropTypes.string
};
export default Panel;