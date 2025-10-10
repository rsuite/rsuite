'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _useTreeWithChildren2 = _interopRequireDefault(require("../Tree/hooks/useTreeWithChildren"));
var _useFlattenTree = _interopRequireDefault(require("../Tree/hooks/useFlattenTree"));
var _useFocusState2 = _interopRequireDefault(require("./hooks/useFocusState"));
var _useExpandTree2 = _interopRequireDefault(require("../Tree/hooks/useExpandTree"));
var _TreeView = _interopRequireDefault(require("../Tree/TreeView"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _utils2 = require("../Tree/utils");
var _Picker = require("../internals/Picker");
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "appearance", "classPrefix", "cleanable", "childrenKey", "data", "disabled", "defaultValue", "defaultExpandAll", "disabledItemValues", "defaultExpandItemValues", "expandItemValues", "id", "locale", "labelKey", "placeholder", "placement", "style", "searchKeyword", "searchable", "showIndentLine", "menuClassName", "menuStyle", "popupClassName", "popupStyle", "popupAutoWidth", "treeHeight", "menuAutoWidth", "valueKey", "virtualized", "value", "listProps", "toggleAs", "searchBy", "getChildren", "onClean", "onSearch", "onSelect", "onSelectItem", "onChange", "onExpand", "onEnter", "onExit", "onEntered", "renderValue", "renderMenu", "renderTree", "renderTreeIcon", "renderTreeNode", "renderExtraFooter"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `TreePicker` component is used for selecting single options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/tree-picker/
 */
var TreePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('TreePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? [] : _propsWithDefaults$da,
    disabled = propsWithDefaults.disabled,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$de = propsWithDefaults.defaultExpandAll,
    defaultExpandAll = _propsWithDefaults$de === void 0 ? false : _propsWithDefaults$de,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? [] : _propsWithDefaults$di,
    _propsWithDefaults$de2 = propsWithDefaults.defaultExpandItemValues,
    defaultExpandItemValues = _propsWithDefaults$de2 === void 0 ? [] : _propsWithDefaults$de2,
    controlledExpandItemValues = propsWithDefaults.expandItemValues,
    id = propsWithDefaults.id,
    locale = propsWithDefaults.locale,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    placeholder = propsWithDefaults.placeholder,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    style = propsWithDefaults.style,
    searchKeyword = propsWithDefaults.searchKeyword,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    showIndentLine = propsWithDefaults.showIndentLine,
    DEPRECATED_menuClassName = propsWithDefaults.menuClassName,
    DEPRECATED_menuStyle = propsWithDefaults.menuStyle,
    popupClassName = propsWithDefaults.popupClassName,
    popupStyle = propsWithDefaults.popupStyle,
    _propsWithDefaults$po = propsWithDefaults.popupAutoWidth,
    popupAutoWidth = _propsWithDefaults$po === void 0 ? true : _propsWithDefaults$po,
    _propsWithDefaults$tr = propsWithDefaults.treeHeight,
    treeHeight = _propsWithDefaults$tr === void 0 ? 320 : _propsWithDefaults$tr,
    _propsWithDefaults$me = propsWithDefaults.menuAutoWidth,
    menuAutoWidth = _propsWithDefaults$me === void 0 ? popupAutoWidth : _propsWithDefaults$me,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$vi = propsWithDefaults.virtualized,
    virtualized = _propsWithDefaults$vi === void 0 ? false : _propsWithDefaults$vi,
    controlledValue = propsWithDefaults.value,
    listProps = propsWithDefaults.listProps,
    toggleAs = propsWithDefaults.toggleAs,
    searchBy = propsWithDefaults.searchBy,
    getChildren = propsWithDefaults.getChildren,
    onClean = propsWithDefaults.onClean,
    onSearch = propsWithDefaults.onSearch,
    onSelect = propsWithDefaults.onSelect,
    onSelectItem = propsWithDefaults.onSelectItem,
    onChange = propsWithDefaults.onChange,
    onExpand = propsWithDefaults.onExpand,
    onEnter = propsWithDefaults.onEnter,
    onExit = propsWithDefaults.onExit,
    onEntered = propsWithDefaults.onEntered,
    renderValue = propsWithDefaults.renderValue,
    DEPRECATED_renderMenu = propsWithDefaults.renderMenu,
    _propsWithDefaults$re = propsWithDefaults.renderTree,
    renderTree = _propsWithDefaults$re === void 0 ? DEPRECATED_renderMenu : _propsWithDefaults$re,
    renderTreeIcon = propsWithDefaults.renderTreeIcon,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput,
    treeView = _usePickerRef.treeView;
  var _useControlled = (0, _hooks.useControlled)(controlledValue, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var itemDataKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useTreeWithChildren = (0, _useTreeWithChildren2.default)(data, itemDataKeys),
    treeData = _useTreeWithChildren.treeData,
    loadingNodeValues = _useTreeWithChildren.loadingNodeValues,
    appendChild = _useTreeWithChildren.appendChild;
  var flattenedNodes = (0, _useFlattenTree.default)(treeData, (0, _extends2.default)({}, itemDataKeys));
  var _useExpandTree = (0, _useExpandTree2.default)(data, (0, _extends2.default)({}, itemDataKeys, {
      defaultExpandAll: defaultExpandAll,
      defaultExpandItemValues: defaultExpandItemValues,
      controlledExpandItemValues: controlledExpandItemValues,
      onExpand: onExpand,
      getChildren: getChildren,
      appendChild: appendChild
    })),
    expandItemValues = _useExpandTree.expandItemValues,
    handleExpandTreeNode = _useExpandTree.handleExpandTreeNode;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var activeNode = (0, _utils2.getTreeActiveNode)(flattenedNodes, value, valueKey);
  var _useTreeImperativeHan = (0, _TreeProvider.useTreeImperativeHandle)(),
    register = _useTreeImperativeHan.register,
    focusFirstNode = _useTreeImperativeHan.focusFirstNode,
    focusActiveNode = _useTreeImperativeHan.focusActiveNode;
  var _useFocusState = (0, _useFocusState2.default)({
      focusActiveNode: focusActiveNode,
      target: target,
      value: value,
      onEnter: onEnter,
      onExit: onExit,
      onEntered: onEntered
    }),
    active = _useFocusState.active,
    focusItemValue = _useFocusState.focusItemValue,
    setFocusItemValue = _useFocusState.setFocusItemValue,
    triggerProps = _useFocusState.triggerProps;
  var handleSelect = (0, _hooks.useEventCallback)(function (treeNode, value, event) {
    var _target$current, _trigger$current, _trigger$current$clos;
    setFocusItemValue(value);
    onSelect === null || onSelect === void 0 || onSelect(treeNode, value, event);
    (_target$current = target.current) === null || _target$current === void 0 || _target$current.focus();
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 || _trigger$current$clos.call(_trigger$current);
  });
  var handleClean = (0, _hooks.useEventCallback)(function (event) {
    var target = event.target;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }
    setValue(null);
    onChange === null || onChange === void 0 || onChange(null, event);
  });
  var handleTreePressEnter = (0, _hooks.useEventCallback)(function (event) {
    if ((0, _isNil.default)(focusItemValue)) {
      return;
    }
    var activeItem = (0, _utils2.getActiveItem)(focusItemValue, flattenedNodes, valueKey);
    handleSelect(activeItem, event);
  });
  var handleTreeKeyDown = (0, _hooks.useEventCallback)(function (event) {
    (0, _Picker.onMenuKeyDown)(event, {
      del: handleClean,
      down: function down() {
        return focusFirstNode();
      },
      enter: handleTreePressEnter
    });
  });
  var onPickerKeydown = (0, _Picker.useToggleKeyDownEvent)((0, _extends2.default)({
    toggle: !activeNode || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: handleTreeKeyDown
  }, rest));
  var handleChange = (0, _hooks.useEventCallback)(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  });
  var treeContext = (0, _react.useMemo)(function () {
    return {
      register: register,
      props: {
        labelKey: labelKey,
        valueKey: valueKey,
        childrenKey: childrenKey,
        virtualized: virtualized,
        renderTreeIcon: renderTreeIcon,
        renderTreeNode: renderTreeNode
      }
    };
  }, [childrenKey, labelKey, valueKey, virtualized, register, renderTreeIcon, renderTreeNode]);
  var tree = /*#__PURE__*/_react.default.createElement(_TreeProvider.TreeProvider, {
    value: treeContext
  }, /*#__PURE__*/_react.default.createElement(_TreeView.default, {
    ref: treeView,
    value: value,
    data: treeData,
    disabledItemValues: disabledItemValues,
    expandItemValues: expandItemValues,
    showIndentLine: showIndentLine,
    searchable: searchable,
    searchKeyword: searchKeyword,
    searchBy: searchBy,
    searchInputRef: searchInput,
    loadingNodeValues: loadingNodeValues,
    flattenedNodes: flattenedNodes,
    listProps: listProps,
    listRef: list,
    locale: locale,
    height: treeHeight,
    onExpand: handleExpandTreeNode,
    onSearch: onSearch,
    onChange: handleChange,
    onSelect: handleSelect,
    onSelectItem: onSelectItem,
    onFocusItem: setFocusItemValue
  }));
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, DEPRECATED_menuClassName, popupClassName, prefix('tree-menu'));
    var mergedMenuStyle = (0, _extends2.default)({}, DEPRECATED_menuStyle, popupStyle, {
      left: left,
      top: top
    });
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: mergedMenuStyle,
      ref: (0, _utils.mergeRefs)(overlay, speakerRef),
      onKeyDown: onPickerKeydown,
      target: trigger
    }, renderTree ? renderTree(tree) : tree, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValidValue = !(0, _isNil.default)(activeNode) || !(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue);
  var selectedElement = placeholder;
  if (hasValidValue) {
    var node = activeNode !== null && activeNode !== void 0 ? activeNode : {};
    selectedElement = node[labelKey];
    if ((0, _isFunction.default)(renderValue) && value) {
      selectedElement = renderValue(value, node, selectedElement);
      if ((0, _isNil.default)(selectedElement)) {
        hasValidValue = false;
      }
    }
  }
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      hasValue: hasValidValue,
      name: 'tree',
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, (0, _extends2.default)({
    id: id,
    popupType: "tree",
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    speaker: renderTreeView
  }, triggerProps), /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys, ['cascade'])), {
    ref: target,
    appearance: appearance,
    onKeyDown: onPickerKeydown,
    onClean: (0, _utils.createChainedFunction)(handleClean, onClean),
    cleanable: cleanable && !disabled,
    as: toggleAs,
    disabled: disabled,
    hasValue: hasValidValue,
    active: active,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
TreePicker.displayName = 'TreePicker';
var _default = exports.default = TreePicker;