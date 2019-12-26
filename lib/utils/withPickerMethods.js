"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

function withPickerMethods() {
  return function (WrappedComponent) {
    var PickerComponent =
    /*#__PURE__*/
    function (_WrappedComponent) {
      (0, _inheritsLoose2.default)(PickerComponent, _WrappedComponent);

      function PickerComponent() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _WrappedComponent.call.apply(_WrappedComponent, [this].concat(args)) || this;

        _this.open = function () {
          if (typeof _this.handleOpenDropdown === 'function') {
            _this.handleOpenDropdown();
          }
        };

        _this.close = function () {
          if (typeof _this.handleCloseDropdown === 'function') {
            _this.handleCloseDropdown();
          }
        };

        return _this;
      }

      var _proto = PickerComponent.prototype;

      _proto.render = function render() {
        return _WrappedComponent.prototype.render.call(this);
      };

      return PickerComponent;
    }(WrappedComponent);

    PickerComponent.defaultProps = WrappedComponent.defaultProps;
    PickerComponent.contextTypes = WrappedComponent.contextTypes;
    PickerComponent.childContextTypes = WrappedComponent.childContextTypes;
    PickerComponent.getDerivedStateFromProps = WrappedComponent.getDerivedStateFromProps;
    return PickerComponent;
  };
}

var _default = withPickerMethods;
exports.default = _default;
module.exports = exports.default;