'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _PanelHeader = _interopRequireDefault(require("./PanelHeader"));
var _PanelBody = _interopRequireDefault(require("./PanelBody"));
var _useExpanded2 = _interopRequireDefault(require("./hooks/useExpanded"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _PanelGroup = require("../PanelGroup");
var _excluded = ["as", "bodyFill", "bodyProps", "bordered", "children", "className", "classPrefix", "caretAs", "collapsible", "defaultExpanded", "disabled", "eventKey", "expanded", "header", "headerRole", "panelRole", "shaded", "scrollShadow", "id", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Panel` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
var Panel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Panel', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var id = (0, _hooks.useUniqueId)('rs-', idProp);
  var bodyId = id + "-panel";
  var buttonId = id + "-btn";
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _ref = (0, _react.useContext)(_PanelGroup.PanelGroupContext) || {},
    onGroupSelect = _ref.onGroupSelect;
  var _useExpanded = (0, _useExpanded2.default)({
      expanded: expandedProp,
      defaultExpanded: defaultExpanded,
      eventKey: eventKey,
      collapsible: collapsibleProp
    }),
    expanded = _useExpanded[0],
    setExpanded = _useExpanded[1],
    collapsible = _useExpanded[2];
  var handleSelect = (0, _hooks.useEventCallback)(function (event) {
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
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes,
    id: idProp
  }), header && /*#__PURE__*/_react.default.createElement(_PanelHeader.default, {
    collapsible: collapsible,
    expanded: expanded,
    caretAs: caretAs,
    role: headerRole,
    buttonId: buttonId,
    bodyId: bodyId,
    disabled: disabled,
    onClickButton: handleSelect
  }, header), /*#__PURE__*/_react.default.createElement(_PanelBody.default, (0, _extends2.default)({
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
  collapsible: _propTypes.default.bool,
  bordered: _propTypes.default.bool,
  shaded: _propTypes.default.bool,
  bodyFill: _propTypes.default.bool,
  header: _propTypes.default.any,
  defaultExpanded: _propTypes.default.bool,
  expanded: _propTypes.default.bool,
  eventKey: _propTypes.default.any,
  panelRole: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  onSelect: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func,
  className: _propTypes.default.string
};
var _default = exports.default = Panel;