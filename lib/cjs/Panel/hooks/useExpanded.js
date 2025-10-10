'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _PanelGroup = require("../../PanelGroup");
var _hooks = require("../../internals/hooks");
function useExpanded(props) {
  var expandedProp = props.expanded,
    defaultExpanded = props.defaultExpanded,
    eventKey = props.eventKey,
    collapsibleProp = props.collapsible;
  var _ref = (0, _react.useContext)(_PanelGroup.PanelGroupContext) || {},
    accordion = _ref.accordion,
    activeKey = _ref.activeKey;
  var _useControlled = (0, _hooks.useControlled)(expandedProp, defaultExpanded || typeof activeKey !== 'undefined' && activeKey === eventKey),
    expandedState = _useControlled[0],
    setExpanded = _useControlled[1];
  var collapsible = collapsibleProp;
  var expanded = expandedState;
  if (accordion) {
    collapsible = true;
  }
  if (collapsible) {
    if (typeof activeKey !== 'undefined' && activeKey !== eventKey) {
      expanded = false;
    }
  }
  (0, _react.useEffect)(function () {
    if (accordion && typeof activeKey !== 'undefined') {
      setExpanded(activeKey === eventKey);
    }
  }, [accordion, activeKey, eventKey, setExpanded]);
  return [expanded, setExpanded, collapsible];
}
var _default = exports.default = useExpanded;