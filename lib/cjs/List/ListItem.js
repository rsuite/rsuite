'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _ListContext = _interopRequireDefault(require("./ListContext"));
var _excluded = ["as", "children", "className", "classPrefix", "collection", "disabled", "index", "size"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `List.Item` component is used to specify the layout of the list item.
 * @see https://rsuitejs.com/components/list
 */
var ListItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    children = props.children,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'list-item' : _props$classPrefix,
    _props$collection = props.collection,
    collection = _props$collection === void 0 ? 0 : _props$collection,
    disabled = props.disabled,
    index = props.index,
    sizeProp = props.size,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useContext = (0, _react.useContext)(_ListContext.default),
    bordered = _useContext.bordered,
    register = _useContext.register,
    parentSize = _useContext.size;
  var size = sizeProp || parentSize;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var listItemRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (listItemRef.current) {
      var _register = register({
          node: listItemRef.current,
          edgeOffset: null,
          info: {
            collection: collection,
            disabled: disabled,
            index: index
          }
        }),
        unregister = _register.unregister;
      return unregister;
    }
  }, [collection, disabled, index, register]);
  var classes = merge(className, withClassPrefix(size, {
    disabled: disabled,
    bordered: bordered
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "listitem",
    "aria-disabled": disabled
  }, rest, {
    ref: (0, _utils.mergeRefs)(listItemRef, ref),
    className: classes
  }), children);
});
ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  index: _propTypes.default.number,
  collection: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  disabled: _propTypes.default.bool,
  children: _propTypes.default.node
};
var _default = exports.default = ListItem;