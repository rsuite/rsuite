"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

var sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
};

var copyStyles = function copyStyles(styles, node) {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

var InputAutosize =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(InputAutosize, _React$Component);

  function InputAutosize(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.inputRef = void 0;
    _this.sizerRef = void 0;
    _this.placeHolderSizerRef = void 0;
    _this.state = {
      inputWidth: props.minWidth
    };
    _this.inputRef = React.createRef();
    _this.sizerRef = React.createRef();
    _this.placeHolderSizerRef = React.createRef();
    return _this;
  }

  var _proto = InputAutosize.prototype;

  _proto.getInputInstance = function getInputInstance() {
    return this.inputRef.current;
  };

  _proto.componentDidMount = function componentDidMount() {
    this.copyInputStyles();
    this.updateInputWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate(_prevProps, prevState) {
    var inputWidth = this.state.inputWidth;

    if (prevState.inputWidth !== inputWidth) {
      var _this$props$onAutosiz, _this$props;

      (_this$props$onAutosiz = (_this$props = this.props).onAutosize) === null || _this$props$onAutosiz === void 0 ? void 0 : _this$props$onAutosiz.call(_this$props, inputWidth);
    }

    this.updateInputWidth();
  };

  _proto.copyInputStyles = function copyInputStyles() {
    if (!this.inputRef.current || !window.getComputedStyle) {
      return;
    }

    var inputStyles = this.inputRef.current && window.getComputedStyle(this.inputRef.current);

    if (!inputStyles) {
      return;
    }

    if (this.sizerRef.current) {
      copyStyles(inputStyles, this.sizerRef.current);
    }

    if (this.placeHolderSizerRef.current) {
      copyStyles(inputStyles, this.placeHolderSizerRef.current);
    }
  };

  _proto.updateInputWidth = function updateInputWidth() {
    if (!this.sizerRef.current || typeof this.sizerRef.current.scrollWidth === 'undefined') {
      return;
    }

    var _this$props2 = this.props,
        minWidth = _this$props2.minWidth,
        placeholder = _this$props2.placeholder,
        value = _this$props2.value;
    var newInputWidth;

    if (placeholder && !value && this.placeHolderSizerRef.current) {
      newInputWidth = Math.max(this.sizerRef.current.scrollWidth, this.placeHolderSizerRef.current.scrollWidth) + 2;
    } else {
      newInputWidth = this.sizerRef.current.scrollWidth + 2;
    }

    if (newInputWidth < minWidth) {
      newInputWidth = minWidth;
    }

    if (newInputWidth !== this.state.inputWidth) {
      this.setState({
        inputWidth: newInputWidth
      });
    }
  };

  _proto.renderStyles = function renderStyles() {
    var inputId = this.props.inputId;
    return (0, _utils.isIE)() ? React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: "input#" + inputId + "::-ms-clear {display: none;}"
      }
    }) : null;
  };

  _proto.render = function render() {
    var inputWidth = this.state.inputWidth;
    var _this$props3 = this.props,
        defaultValue = _this$props3.defaultValue,
        value = _this$props3.value,
        style = _this$props3.style,
        className = _this$props3.className,
        placeholder = _this$props3.placeholder,
        inputClassName = _this$props3.inputClassName,
        inputStyle = _this$props3.inputStyle,
        inputId = _this$props3.inputId;
    var sizerValue = [defaultValue, value, ''].reduce(function (previousValue, currentValue) {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }

      return currentValue;
    });
    var wrapperStyle = (0, _extends2.default)({}, style);

    if (!wrapperStyle.display) {
      wrapperStyle.display = 'inline-block';
    }

    var nextInputStyle = (0, _extends2.default)({
      boxSizing: 'content-box',
      width: inputWidth + "px"
    }, inputStyle);

    var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(this.props),
        htmlInputProps = _partitionHTMLProps[0];

    htmlInputProps.className = inputClassName;
    htmlInputProps.id = inputId;
    htmlInputProps.style = nextInputStyle;
    return React.createElement("div", {
      className: className,
      style: wrapperStyle
    }, this.renderStyles(), React.createElement("input", (0, _extends2.default)({}, htmlInputProps, {
      ref: this.inputRef,
      type: "text"
    })), React.createElement("div", {
      ref: this.sizerRef,
      style: sizerStyle
    }, sizerValue), placeholder ? React.createElement("div", {
      ref: this.placeHolderSizerRef,
      style: sizerStyle
    }, placeholder) : null);
  };

  return InputAutosize;
}(React.Component);

InputAutosize.propTypes = {
  className: _propTypes.default.string,
  defaultValue: _propTypes.default.any,
  inputId: _propTypes.default.string,
  inputClassName: _propTypes.default.string,
  inputStyle: _propTypes.default.object,
  minWidth: _propTypes.default.number,
  onChange: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  style: _propTypes.default.object,
  value: _propTypes.default.any,
  onAutosize: _propTypes.default.func
};
InputAutosize.defaultProps = {
  minWidth: 1,
  inputId: '_' + Math.random().toString(36).substr(2, 12)
};
var _default = InputAutosize;
exports.default = _default;
module.exports = exports.default;