'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _getPosition = _interopRequireDefault(require("dom-lib/getPosition"));
var _scrollTop = _interopRequireDefault(require("dom-lib/scrollTop"));
var _Spinner = _interopRequireDefault(require("@rsuite/icons/Spinner"));
var _ArrowLeftLine = _interopRequireDefault(require("@rsuite/icons/ArrowLeftLine"));
var _ArrowRightLine = _interopRequireDefault(require("@rsuite/icons/ArrowRightLine"));
var _utils = require("../internals/utils");
var _hooks = require("../internals/hooks");
var _Picker = require("../internals/Picker");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "activeItemValue", "classPrefix", "className", "childrenKey", "disabledItemValues", "columnWidth", "columnHeight", "valueKey", "data", "cascadePaths", "loadingItemsSet", "labelKey", "style", "renderColumn", "renderTreeNode", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var emptyArray = [];
var TreeView = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    activeItemValue = props.activeItemValue,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'tree' : _props$classPrefix,
    className = props.className,
    _props$childrenKey = props.childrenKey,
    childrenKey = _props$childrenKey === void 0 ? 'children' : _props$childrenKey,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    _props$columnWidth = props.columnWidth,
    columnWidth = _props$columnWidth === void 0 ? 140 : _props$columnWidth,
    _props$columnHeight = props.columnHeight,
    columnHeight = _props$columnHeight === void 0 ? 200 : _props$columnHeight,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$data = props.data,
    data = _props$data === void 0 ? emptyArray : _props$data,
    _props$cascadePaths = props.cascadePaths,
    cascadePaths = _props$cascadePaths === void 0 ? emptyArray : _props$cascadePaths,
    loadingItemsSet = props.loadingItemsSet,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    style = props.style,
    renderColumn = props.renderColumn,
    renderTreeNode = props.renderTreeNode,
    onSelect = props.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, prefix('items'));
  var rootRef = (0, _react.useRef)();
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  var _useCombobox = (0, _Picker.useCombobox)(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType;
  (0, _react.useEffect)(function () {
    var _rootRef$current;
    var columns = ((_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.querySelectorAll('[data-type="column"]')) || [];
    columns.forEach(function (column) {
      if (!column) {
        return;
      }
      var activeItem = column.querySelector("." + prefix('item-focus'));
      if (!activeItem) {
        activeItem = column.querySelector("." + prefix('item-active'));
      }
      if (activeItem) {
        var position = (0, _getPosition.default)(activeItem, column);
        // Let the active option scroll into view.
        if (position !== null && position !== void 0 && position.top) {
          (0, _scrollTop.default)(column, position === null || position === void 0 ? void 0 : position.top);
        }
      }
    });
  }, [prefix]);
  var getCascadePaths = function getCascadePaths(layer, node) {
    var paths = [];
    for (var i = 0; i < data.length && i < layer; i += 1) {
      if (i < layer - 1 && cascadePaths) {
        paths.push(cascadePaths[i]);
      }
    }
    paths.push(node);
    return paths;
  };
  var handleSelect = (0, _hooks.useEventCallback)(function (layer, itemData, event) {
    var isLeafNode = (0, _isNil.default)(itemData[childrenKey]);
    var cascadePaths = getCascadePaths(layer + 1, itemData);
    onSelect === null || onSelect === void 0 || onSelect({
      itemData: itemData,
      cascadePaths: cascadePaths,
      isLeafNode: isLeafNode
    }, event);
  });
  var renderCascadeNode = function renderCascadeNode(nodeProps) {
    var _loadingItemsSet$has;
    var itemData = nodeProps.itemData,
      index = nodeProps.index,
      layer = nodeProps.layer,
      focus = nodeProps.focus,
      size = nodeProps.size;
    var children = itemData[childrenKey];
    var value = itemData[valueKey];
    var label = itemData[labelKey];
    var disabled = disabledItemValues.some(function (disabledValue) {
      return (0, _utils.shallowEqual)(disabledValue, value);
    });
    var loading = (_loadingItemsSet$has = loadingItemsSet === null || loadingItemsSet === void 0 ? void 0 : loadingItemsSet.has(itemData)) !== null && _loadingItemsSet$has !== void 0 ? _loadingItemsSet$has : false;

    // Use `value` in keys when If `value` is string or number
    var onlyKey = typeof value === 'number' || typeof value === 'string' ? value : index;
    var Icon = loading ? _Spinner.default : rtl ? _ArrowLeftLine.default : _ArrowRightLine.default;
    return /*#__PURE__*/_react.default.createElement(_Picker.ListItem, {
      as: 'li',
      role: "treeitem",
      "aria-level": layer + 1,
      "aria-setsize": size,
      "aria-posinset": index + 1,
      "aria-label": typeof label === 'string' ? label : undefined,
      classPrefix: "cascade-tree-item",
      key: layer + "-" + onlyKey,
      disabled: disabled,
      active: !(0, _isUndefined.default)(activeItemValue) && (0, _utils.shallowEqual)(activeItemValue, value),
      focus: focus,
      value: value,
      className: children ? prefix('has-children') : undefined,
      onSelect: function onSelect(_value, event) {
        return handleSelect(layer, itemData, event);
      }
    }, renderTreeNode ? renderTreeNode(label, itemData) : label, children ? /*#__PURE__*/_react.default.createElement(Icon, {
      className: prefix('caret'),
      spin: loading,
      "data-testid": "spinner"
    }) : null);
  };
  var cascadeNodes = data.map(function (children, layer) {
    var onlyKey = layer + "_" + children.length;
    var parentItem = cascadePaths[layer - 1];
    var childNodes = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children.map(function (itemData, index) {
      var focus = cascadePaths[layer] && (0, _utils.shallowEqual)(cascadePaths[layer][valueKey], itemData[valueKey]);
      return renderCascadeNode({
        itemData: itemData,
        index: index,
        layer: layer,
        focus: focus,
        size: children.length
      });
    }));
    return /*#__PURE__*/_react.default.createElement("ul", {
      role: "group",
      "data-layer": layer,
      "data-type": 'column',
      key: onlyKey,
      className: prefix('column'),
      style: {
        height: columnHeight,
        width: columnWidth
      }
    }, renderColumn ? renderColumn(childNodes, {
      items: children,
      parentItem: parentItem,
      layer: layer
    }) : childNodes);
  });
  var styles = (0, _extends2.default)({}, style, {
    width: data.length * columnWidth
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "tree",
    id: id ? id + "-" + popupType : undefined,
    "aria-labelledby": labelId
  }, rest, {
    ref: (0, _utils.mergeRefs)(rootRef, ref),
    className: classes,
    style: styles
  }), cascadeNodes);
});
TreeView.displayName = 'TreeView';
var _default = exports.default = TreeView;