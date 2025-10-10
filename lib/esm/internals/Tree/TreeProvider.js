'use client';
import { createContext, useContext, useRef, useCallback } from 'react';
var defaultItemDataKeys = {
  labelKey: 'label',
  valueKey: 'value',
  childrenKey: 'children',
  virtualized: false
};
var TreeContext = /*#__PURE__*/createContext({
  props: defaultItemDataKeys
});
export var TreeProvider = TreeContext.Provider;
export var useRegisterTreeMethods = function useRegisterTreeMethods() {
  var _useContext = useContext(TreeContext),
    register = _useContext.register;
  return register;
};
export var useTreeCustomRenderer = function useTreeCustomRenderer() {
  var _useContext2 = useContext(TreeContext),
    _useContext2$props = _useContext2.props,
    renderTreeIcon = _useContext2$props.renderTreeIcon,
    renderTreeNode = _useContext2$props.renderTreeNode;
  return {
    renderTreeIcon: renderTreeIcon,
    renderTreeNode: renderTreeNode
  };
};
export var useItemDataKeys = function useItemDataKeys() {
  var _useContext3 = useContext(TreeContext),
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
export var useTreeContextProps = function useTreeContextProps() {
  var _useContext4 = useContext(TreeContext),
    props = _useContext4.props;
  return props;
};

/**
 * Custom hook that provides imperative handle for the Tree component.
 */
export var useTreeImperativeHandle = function useTreeImperativeHandle() {
  var focusFirstNodeRef = useRef(null);
  var focusActiveNodeRef = useRef(null);
  var register = useCallback(function (_ref) {
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