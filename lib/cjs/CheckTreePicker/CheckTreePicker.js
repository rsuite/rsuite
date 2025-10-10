'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _pick2 = _interopRequireDefault(require("lodash/pick"));
var _isNil2 = _interopRequireDefault(require("lodash/isNil"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _Picker = require("../internals/Picker");
var _CheckTreeView = _interopRequireDefault(require("../CheckTree/CheckTreeView"));
var _useTreeValue2 = _interopRequireDefault(require("../CheckTree/hooks/useTreeValue"));
var _useFlattenTree = _interopRequireDefault(require("../Tree/hooks/useFlattenTree"));
var _useTreeWithChildren2 = _interopRequireDefault(require("../Tree/hooks/useTreeWithChildren"));
var _useExpandTree2 = _interopRequireDefault(require("../Tree/hooks/useExpandTree"));
var _useFocusState2 = _interopRequireDefault(require("./hooks/useFocusState"));
var _utils2 = require("../CheckTree/utils");
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "id", "appearance", "cleanable", "countable", "cascade", "classPrefix", "childrenKey", "disabled", "data", "defaultValue", "defaultExpandAll", "disabledItemValues", "expandItemValues", "defaultExpandItemValues", "placeholder", "popupClassName", "popupStyle", "popupAutoWidth", "placement", "treeHeight", "toggleAs", "menuAutoWidth", "menuClassName", "menuStyle", "style", "searchBy", "searchKeyword", "showIndentLine", "searchable", "valueKey", "value", "virtualized", "uncheckableItemValues", "locale", "labelKey", "listProps", "getChildren", "renderExtraFooter", "onEnter", "onChange", "onClean", "onExit", "onSearch", "onSelect", "onSelectItem", "onScroll", "onExpand", "renderValue", "renderMenu", "renderTree", "renderTreeIcon", "renderTreeNode", "onCascadeChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
var CheckTreePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('CheckTreePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    id = propsWithDefaults.id,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl === void 0 ? true : _propsWithDefaults$cl,
    _propsWithDefaults$co = propsWithDefaults.countable,
    countable = _propsWithDefaults$co === void 0 ? true : _propsWithDefaults$co,
    _propsWithDefaults$ca = propsWithDefaults.cascade,
    cascade = _propsWithDefaults$ca === void 0 ? true : _propsWithDefaults$ca,
    _propsWithDefaults$cl2 = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl2 === void 0 ? 'picker' : _propsWithDefaults$cl2,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    disabled = propsWithDefaults.disabled,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? [] : _propsWithDefaults$da,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? [] : _propsWithDefaults$de,
    _propsWithDefaults$de2 = propsWithDefaults.defaultExpandAll,
    defaultExpandAll = _propsWithDefaults$de2 === void 0 ? false : _propsWithDefaults$de2,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? [] : _propsWithDefaults$di,
    controlledExpandItemValues = propsWithDefaults.expandItemValues,
    _propsWithDefaults$de3 = propsWithDefaults.defaultExpandItemValues,
    defaultExpandItemValues = _propsWithDefaults$de3 === void 0 ? [] : _propsWithDefaults$de3,
    placeholder = propsWithDefaults.placeholder,
    popupClassName = propsWithDefaults.popupClassName,
    popupStyle = propsWithDefaults.popupStyle,
    _propsWithDefaults$po = propsWithDefaults.popupAutoWidth,
    popupAutoWidth = _propsWithDefaults$po === void 0 ? true : _propsWithDefaults$po,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    _propsWithDefaults$tr = propsWithDefaults.treeHeight,
    treeHeight = _propsWithDefaults$tr === void 0 ? 320 : _propsWithDefaults$tr,
    toggleAs = propsWithDefaults.toggleAs,
    _propsWithDefaults$me = propsWithDefaults.menuAutoWidth,
    menuAutoWidth = _propsWithDefaults$me === void 0 ? popupAutoWidth : _propsWithDefaults$me,
    DEPRECATED_menuClassName = propsWithDefaults.menuClassName,
    DEPRECATED_menuStyle = propsWithDefaults.menuStyle,
    style = propsWithDefaults.style,
    searchBy = propsWithDefaults.searchBy,
    searchKeyword = propsWithDefaults.searchKeyword,
    showIndentLine = propsWithDefaults.showIndentLine,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    controlledValue = propsWithDefaults.value,
    _propsWithDefaults$vi = propsWithDefaults.virtualized,
    virtualized = _propsWithDefaults$vi === void 0 ? false : _propsWithDefaults$vi,
    _propsWithDefaults$un = propsWithDefaults.uncheckableItemValues,
    uncheckableItemValues = _propsWithDefaults$un === void 0 ? [] : _propsWithDefaults$un,
    locale = propsWithDefaults.locale,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    listProps = propsWithDefaults.listProps,
    getChildren = propsWithDefaults.getChildren,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    onEnter = propsWithDefaults.onEnter,
    onChange = propsWithDefaults.onChange,
    onClean = propsWithDefaults.onClean,
    onExit = propsWithDefaults.onExit,
    onSearch = propsWithDefaults.onSearch,
    onSelect = propsWithDefaults.onSelect,
    onSelectItem = propsWithDefaults.onSelectItem,
    onScroll = propsWithDefaults.onScroll,
    onExpand = propsWithDefaults.onExpand,
    renderValue = propsWithDefaults.renderValue,
    DEPRECATED_renderMenu = propsWithDefaults.renderMenu,
    _propsWithDefaults$re = propsWithDefaults.renderTree,
    renderTree = _propsWithDefaults$re === void 0 ? DEPRECATED_renderMenu : _propsWithDefaults$re,
    renderTreeIcon = propsWithDefaults.renderTreeIcon,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    onCascadeChange = propsWithDefaults.onCascadeChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput,
    treeView = _usePickerRef.treeView;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix;
  var _useTreeValue = (0, _useTreeValue2.default)(controlledValue, {
      defaultValue: defaultValue,
      uncheckableItemValues: uncheckableItemValues
    }),
    value = _useTreeValue[0],
    setValue = _useTreeValue[1];
  var itemDataKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useTreeWithChildren = (0, _useTreeWithChildren2.default)(data, itemDataKeys),
    treeData = _useTreeWithChildren.treeData,
    loadingNodeValues = _useTreeWithChildren.loadingNodeValues,
    appendChild = _useTreeWithChildren.appendChild;
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
  var flattenedNodes = (0, _useFlattenTree.default)(treeData, (0, _extends2.default)({}, itemDataKeys, {
    uncheckableItemValues: uncheckableItemValues,
    multiple: true,
    cascade: cascade,
    value: value
  }));
  var selectedNodes = (0, _utils2.getSelectedItems)(flattenedNodes, value);
  var _useTreeImperativeHan = (0, _TreeProvider.useTreeImperativeHandle)(),
    register = _useTreeImperativeHan.register,
    focusFirstNode = _useTreeImperativeHan.focusFirstNode;
  var _useFocusState = (0, _useFocusState2.default)({
      target: target,
      onEnter: onEnter,
      onExit: onExit
    }),
    focusItemValue = _useFocusState.focusItemValue,
    setFocusItemValue = _useFocusState.setFocusItemValue,
    active = _useFocusState.active,
    triggerProps = _useFocusState.triggerProps;
  var handleClean = (0, _hooks.useEventCallback)(function (event) {
    var target = event.target;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }
    setFocusItemValue(null);
    setValue([]);
    onChange === null || onChange === void 0 || onChange([], event);
    onCascadeChange === null || onCascadeChange === void 0 || onCascadeChange([], event);
  });
  var handleTreeKeyDown = (0, _hooks.useEventCallback)(function (event) {
    (0, _Picker.onMenuKeyDown)(event, {
      del: handleClean,
      down: function down() {
        return focusFirstNode();
      }
    });
  });
  var onPickerKeydown = (0, _Picker.useToggleKeyDownEvent)((0, _extends2.default)({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: handleTreeKeyDown
  }, rest));

  // transform the parent node value to the leaf node value
  var handleTransValue2Children = (0, _hooks.useEventCallback)(function (nextSelectedNodes) {
    return nextSelectedNodes.map(function (node) {
      var currentNode = node.refKey ? flattenedNodes[node.refKey] : null;
      if (currentNode && currentNode[childrenKey] && currentNode[childrenKey].length) {
        var childNodes = currentNode[childrenKey].filter(function (child) {
          var childValue = child[valueKey];
          return !disabledItemValues.includes(childValue) && !uncheckableItemValues.includes(childValue);
        });
        return handleTransValue2Children(childNodes);
      }
      return node;
    }).flat();
  });
  var handleChangeCascade = (0, _hooks.useEventCallback)(function (nextValue, event) {
    if (!cascade) {
      onCascadeChange === null || onCascadeChange === void 0 || onCascadeChange(nextValue, event);
    } else {
      var nextSelectedNodes = (0, _utils2.getSelectedItems)(flattenedNodes, nextValue);
      var childrenNodes = handleTransValue2Children(nextSelectedNodes);
      var childrenValue = childrenNodes.map(function (node) {
        return node[valueKey];
      });
      onCascadeChange === null || onCascadeChange === void 0 || onCascadeChange(childrenValue, event);
    }
  });
  var handleChange = (0, _hooks.useEventCallback)(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
    handleChangeCascade(nextValue, event);
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
  var checkTreeView = /*#__PURE__*/_react.default.createElement(_TreeProvider.TreeProvider, {
    value: treeContext
  }, /*#__PURE__*/_react.default.createElement(_CheckTreeView.default, {
    ref: treeView,
    disabledItemValues: disabledItemValues,
    expandItemValues: expandItemValues,
    uncheckableItemValues: uncheckableItemValues,
    cascade: cascade,
    data: treeData,
    height: treeHeight,
    showIndentLine: showIndentLine,
    listProps: listProps,
    listRef: list,
    locale: locale,
    searchBy: searchBy,
    searchable: searchable,
    searchKeyword: searchKeyword,
    searchInputRef: searchInput,
    onScroll: onScroll,
    onSelect: onSelect,
    onSelectItem: onSelectItem,
    onExpand: handleExpandTreeNode,
    onSearch: onSearch,
    onChange: handleChange,
    onFocusItem: setFocusItemValue,
    value: value,
    loadingNodeValues: loadingNodeValues,
    flattenedNodes: flattenedNodes
  }));
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = (0, _classnames.default)(className, popupClassName, DEPRECATED_menuClassName, prefix('check-tree-menu'));
    var mergedMenuStyle = (0, _extends2.default)({}, popupStyle, DEPRECATED_menuStyle, {
      left: left,
      top: top
    });
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils.mergeRefs)(overlay, speakerRef),
      autoWidth: menuAutoWidth,
      className: classes,
      style: mergedMenuStyle,
      onKeyDown: onPickerKeydown,
      target: trigger
    }, renderTree ? renderTree(checkTreeView) : checkTreeView, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValidValue = selectedNodes.length > 0 || value.length > 0 && (0, _isFunction2.default)(renderValue);
  var selectedElement = placeholder;
  if (hasValidValue) {
    selectedElement = /*#__PURE__*/_react.default.createElement(_Picker.SelectedElement, {
      selectedItems: selectedNodes,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      prefix: prefix,
      cascade: cascade,
      locale: locale
    });
    if ((0, _isFunction2.default)(renderValue)) {
      selectedElement = renderValue(value, selectedNodes, selectedElement);
      if ((0, _isNil2.default)(selectedElement)) {
        hasValidValue = false;
      }
    }
  }
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      countable: countable,
      cleanable: cleanable,
      disabled: disabled,
      hasValue: hasValidValue,
      name: 'check-tree'
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, (0, _extends2.default)({
    id: id,
    popupType: "tree",
    multiple: true,
    pickerProps: (0, _pick2.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    speaker: renderTreeView
  }, triggerProps), /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit2.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    appearance: appearance,
    onKeyDown: onPickerKeydown,
    onClean: (0, _utils.createChainedFunction)(handleClean, onClean),
    cleanable: cleanable && !disabled,
    disabled: disabled,
    as: toggleAs,
    hasValue: hasValidValue,
    active: active,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
CheckTreePicker.displayName = 'CheckTreePicker';
var _default = exports.default = CheckTreePicker;