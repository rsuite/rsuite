'use client';
"use strict";

exports.__esModule = true;
exports.useTreeImperativeHandle = exports.useTreeCustomRenderer = exports.useTreeContextProps = exports.useRegisterTreeMethods = exports.useItemDataKeys = exports.TreeProvider = void 0;
var _react = require("react");
var defaultItemDataKeys = {
  labelKey: 'label',
  valueKey: 'value',
  childrenKey: 'children',
  virtualized: false
};
var TreeContext = /*#__PURE__*/(0, _react.createContext)({
  props: defaultItemDataKeys
});
var TreeProvider = exports.TreeProvider = TreeContext.Provider;
var useRegisterTreeMethods = exports.useRegisterTreeMethods = function useRegisterTreeMethods() {
  var _useContext = (0, _react.useContext)(TreeContext),
    register = _useContext.register;
  return register;
};
var useTreeCustomRenderer = exports.useTreeCustomRenderer = function useTreeCustomRenderer() {
  var _useContext2 = (0, _react.useContext)(TreeContext),
    _useContext2$props = _useContext2.props,
    renderTreeIcon = _useContext2$props.renderTreeIcon,
    renderTreeNode = _useContext2$props.renderTreeNode;
  return {
    renderTreeIcon: renderTreeIcon,
    renderTreeNode: renderTreeNode
  };
};
var useItemDataKeys = exports.useItemDataKeys = function useItemDataKeys() {
  var _useContext3 = (0, _react.useContext)(TreeContext),
    _useContext3$props = _useContext3.props,
    _useContext3$props2 = _useContext3$props === void 0 ? defaultItemDataKeys : _useContext3$props,
    labelKey = _useContext3$props2.labelKey,
    valueKey = _useContext3$props2.valueKey,
    childrenKey = _useContext3$props2.childrenKey;
  return {
    labelKey: labelKey,
    valueKey: valueKey,
    childrenKey: childrenKey
  };
};
var useTreeContextProps = exports.useTreeContextProps = function useTreeContextProps() {
  var _useContext4 = (0, _react.useContext)(TreeContext),
    props = _useContext4.props;
  return props;
};

/**
 * Custom hook that provides imperative handle for the Tree component.
 */
var useTreeImperativeHandle = exports.useTreeImperativeHandle = function useTreeImperativeHandle() {
  var focusFirstNodeRef = (0, _react.useRef)(null);
  var focusActiveNodeRef = (0, _react.useRef)(null);
  var register = (0, _react.useCallback)(function (_ref) {
    var focusTreeFirstNode = _ref.focusTreeFirstNode,
      focusTreeActiveNode = _ref.focusTreeActiveNode;
    focusFirstNodeRef.current = focusTreeFirstNode;
    focusActiveNodeRef.current = focusTreeActiveNode;
    return function () {
      focusFirstNodeRef.current = null;
      focusActiveNodeRef.current = null;
    };
  }, []);
  return {
    register: register,
    focusFirstNode: function focusFirstNode() {
      var _focusFirstNodeRef$cu;
      return (_focusFirstNodeRef$cu = focusFirstNodeRef.current) === null || _focusFirstNodeRef$cu === void 0 ? void 0 : _focusFirstNodeRef$cu.call(focusFirstNodeRef);
    },
    focusActiveNode: function focusActiveNode() {
      var _focusActiveNodeRef$c;
      return (_focusActiveNodeRef$c = focusActiveNodeRef.current) === null || _focusActiveNodeRef$c === void 0 ? void 0 : _focusActiveNodeRef$c.call(focusActiveNodeRef);
    }
  };
};