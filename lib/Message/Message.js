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

var _Icon = _interopRequireDefault(require("../Icon"));

var _constants = require("../constants");

var _utils = require("../utils");

var Message =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Message, _React$Component);

  function Message(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.handleClose = function () {
      _this.setState({
        display: 'hiding'
      });

      setTimeout(function () {
        return _this.setState({
          display: 'hide'
        }, function () {
          var _this$props$onClose, _this$props;

          (_this$props$onClose = (_this$props = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props);
        });
      }, 1000);
    };

    _this.state = {
      display: 'show'
    };
    return _this;
  }

  var _proto = Message.prototype;

  _proto.renderCloseButton = function renderCloseButton(closeLabel) {
    return React.createElement("button", {
      type: "button",
      className: this.addPrefix('btn-close'),
      onClick: this.handleClose
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"), React.createElement("span", {
      className: "sr-only"
    }, closeLabel));
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        type = _this$props2.type,
        title = _this$props2.title,
        description = _this$props2.description,
        closeLabel = _this$props2.closeLabel,
        closable = _this$props2.closable,
        full = _this$props2.full,
        showIcon = _this$props2.showIcon,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "classPrefix", "type", "title", "description", "closeLabel", "closable", "full", "showIcon"]);
    var display = this.state.display;

    if (display === 'hide') {
      return null;
    }

    var hasTitle = !!title;
    var hasDesc = !!description;
    var classes = (0, _classnames.default)(classPrefix, className, this.addPrefix(type), this.addPrefix(display), (_classNames = {}, _classNames[this.addPrefix('has-title')] = hasTitle, _classNames[this.addPrefix('has-icon')] = showIcon, _classNames[this.addPrefix('full')] = full, _classNames));
    return React.createElement("div", (0, _extends2.default)({}, props, {
      className: classes
    }), React.createElement("div", {
      className: this.addPrefix('container')
    }, closable && this.renderCloseButton(closeLabel), showIcon && React.createElement("div", {
      className: this.addPrefix('icon-wrapper')
    }, React.createElement(_Icon.default, {
      icon: _constants.STATUS_ICON_NAMES[type]
    })), React.createElement("div", {
      className: this.addPrefix('content')
    }, hasTitle && React.createElement("h5", {
      className: this.addPrefix('header')
    }, title), hasDesc && React.createElement("div", {
      className: this.addPrefix('body')
    }, description))));
  };

  return Message;
}(React.Component);

Message.propTypes = {
  type: _propTypes.default.oneOf(_constants.STATUS),
  className: _propTypes.default.string,
  onClose: _propTypes.default.func,
  closable: _propTypes.default.bool,
  closeLabel: _propTypes.default.string,
  title: _propTypes.default.node,
  description: _propTypes.default.node,
  showIcon: _propTypes.default.bool,
  full: _propTypes.default.bool,
  classPrefix: _propTypes.default.string
};
Message.defaultProps = {
  type: 'info',
  closeLabel: 'Close'
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'message'
})(Message);

exports.default = _default;
module.exports = exports.default;