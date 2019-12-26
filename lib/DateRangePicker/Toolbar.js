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

var _classnames = _interopRequireDefault(require("classnames"));

var _sub_days = _interopRequireDefault(require("date-fns/sub_days"));

var _add_days = _interopRequireDefault(require("date-fns/add_days"));

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var _utils = require("../utils");

var _utils2 = require("./utils");

var defaultRanges = [{
  label: 'today',
  value: [(0, _utils2.setTimingMargin)(new Date()), (0, _utils2.setTimingMargin)(new Date(), 'right')]
}, {
  label: 'yesterday',
  value: [(0, _utils2.setTimingMargin)((0, _add_days.default)(new Date(), -1)), (0, _utils2.setTimingMargin)((0, _add_days.default)(new Date(), -1), 'right')]
}, {
  label: 'last7Days',
  value: [(0, _utils2.setTimingMargin)((0, _sub_days.default)(new Date(), 6)), (0, _utils2.setTimingMargin)(new Date(), 'right')]
}];

function hasLocaleKey(key) {
  return defaultRanges.some(function (item) {
    return item.label === key;
  });
}

var Toolbar =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(Toolbar, _React$PureComponent);

  function Toolbar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = Toolbar.prototype;

  _proto.renderOkButton = function renderOkButton() {
    var _classNames;

    var _this$props = this.props,
        disabledOkButton = _this$props.disabledOkButton,
        pageDate = _this$props.pageDate,
        onOk = _this$props.onOk,
        hideOkButton = _this$props.hideOkButton;

    if (hideOkButton) {
      return null;
    }

    var disabled = disabledOkButton === null || disabledOkButton === void 0 ? void 0 : disabledOkButton(pageDate);
    var classes = (0, _classnames.default)(this.addPrefix('right-btn-ok'), (_classNames = {}, _classNames[this.addPrefix('btn-disabled')] = disabled, _classNames));
    return React.createElement("div", {
      className: this.addPrefix('right')
    }, React.createElement("button", {
      className: classes,
      onClick: disabled ? undefined : onOk
    }, React.createElement(_FormattedMessage.default, {
      id: "ok"
    })));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        ranges = _this$props2.ranges,
        onShortcut = _this$props2.onShortcut,
        disabledShortcutButton = _this$props2.disabledShortcutButton,
        className = _this$props2.className,
        pageDate = _this$props2.pageDate,
        classPrefix = _this$props2.classPrefix,
        hideOkButton = _this$props2.hideOkButton,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["ranges", "onShortcut", "disabledShortcutButton", "className", "pageDate", "classPrefix", "hideOkButton"]);

    if (hideOkButton && ranges.length === 0) {
      return null;
    }

    var classes = (0, _classnames.default)(classPrefix, className);
    var unhandled = (0, _utils.getUnhandledProps)(Toolbar, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), React.createElement("div", {
      className: this.addPrefix('ranges')
    }, ranges.map(function (item, index) {
      var _classNames2;

      var value = typeof item.value === 'function' ? item.value(pageDate) : item.value;
      var disabled = disabledShortcutButton === null || disabledShortcutButton === void 0 ? void 0 : disabledShortcutButton(value);
      var itemClassName = (0, _classnames.default)(_this2.addPrefix('option'), (_classNames2 = {}, _classNames2[_this2.addPrefix('option-disabled')] = disabled, _classNames2));
      return React.createElement("a", {
        /* eslint-disable */
        key: index,
        role: "button",
        tabIndex: -1,
        className: itemClassName,
        onClick: function onClick(event) {
          !disabled && onShortcut(value, item.closeOverlay, event);
        }
      }, hasLocaleKey(item.label) ? React.createElement(_FormattedMessage.default, {
        id: item.label
      }) : item.label);
    })), this.renderOkButton());
  };

  return Toolbar;
}(React.PureComponent);

Toolbar.propTypes = {
  ranges: _propTypes.default.array,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  pageDate: _propTypes.default.array,
  onShortcut: _propTypes.default.func,
  onOk: _propTypes.default.func,
  disabledOkButton: _propTypes.default.func,
  disabledShortcutButton: _propTypes.default.func,
  selectValue: _propTypes.default.array,
  hideOkButton: _propTypes.default.bool
};
Toolbar.defaultProps = {
  ranges: defaultRanges
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'picker-toolbar'
});

var _default = enhance(Toolbar);

exports.default = _default;
module.exports = exports.default;