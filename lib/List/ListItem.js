"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _ListContext = _interopRequireDefault(require("./ListContext"));

var ListItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ListItem, _React$Component);

  function ListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.managerRef = void 0;
    _this.listItemRef = React.createRef();

    _this.register = function () {
      var _this$props = _this.props,
          collection = _this$props.collection,
          disabled = _this$props.disabled,
          index = _this$props.index,
          manager = _this$props.manager;

      if (manager) {
        _this.managerRef = {
          node: _this.listItemRef.current,
          edgeOffset: null,
          info: {
            collection: collection,
            disabled: disabled,
            index: index,
            manager: manager
          }
        };
        manager.add(collection, _this.managerRef);
      }
    };

    _this.unregister = function (collection) {
      if (collection === void 0) {
        collection = _this.props.collection;
      }

      var manager = _this.props.manager;

      if (manager) {
        manager.remove(collection, _this.managerRef);
      }
    };

    return _this;
  }

  var _proto = ListItem.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.register();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.managerRef.info.index = this.props.index;
    this.managerRef.info.disabled = this.props.disabled;

    if (prevProps.collection !== this.props.collection) {
      this.unregister(prevProps.collection);
      this.register();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unregister();
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        bordered = _this$props2.bordered,
        disabled = _this$props2.disabled,
        children = _this$props2.children,
        size = _this$props2.size,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "classPrefix", "bordered", "disabled", "children", "size"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(ListItem, rest);
    var classes = (0, _classnames.default)(classPrefix, className, addPrefix(size), (_classNames = {}, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('bordered')] = bordered, _classNames));
    var itemContent = React.createElement("div", {
      className: addPrefix('content')
    }, children);
    return React.createElement("div", (0, _extends2.default)({
      ref: this.listItemRef,
      className: classes
    }, unhandled), itemContent);
  };

  return ListItem;
}(React.Component);

ListItem.defaultProps = {
  collection: 0
};
ListItem.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  index: _propTypes.default.number,
  collection: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  disabled: _propTypes.default.bool
};
var EnhancedListItem = (0, _utils.defaultProps)({
  classPrefix: 'list-item'
})(ListItem);
var Component = (0, _recompose.setDisplayName)('ListItem')(EnhancedListItem);

var WithContextListItem = function WithContextListItem(props) {
  return React.createElement(_ListContext.default.Consumer, null, function (context) {
    return React.createElement(Component, (0, _extends2.default)({}, props, context));
  });
};

var _default = WithContextListItem;
exports.default = _default;
module.exports = exports.default;