'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _useMaxWidth = _interopRequireDefault(require("./useMaxWidth"));
var _InputAutosize = _interopRequireDefault(require("../InputAutosize"));
var INPUT_MARGIN_RIGHT = 60;
function useInput(props) {
  var multi = props.multi,
    triggerRef = props.triggerRef;
  var inputRef = (0, _react.useRef)();
  var maxWidth = (0, _useMaxWidth.default)(triggerRef);
  var getInput = (0, _react.useCallback)(function () {
    var _inputRef$current;
    return multi ? (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.input : inputRef.current;
  }, [multi]);
  var focus = (0, _react.useCallback)(function () {
    var _getInput;
    (_getInput = getInput()) === null || _getInput === void 0 || _getInput.focus();
  }, [getInput]);
  var blur = (0, _react.useCallback)(function () {
    var _getInput2;
    (_getInput2 = getInput()) === null || _getInput2 === void 0 || _getInput2.blur();
  }, [getInput]);
  var inputProps = (0, _react.useMemo)(function () {
    return multi ? {
      inputStyle: {
        maxWidth: maxWidth - INPUT_MARGIN_RIGHT
      },
      as: _InputAutosize.default
    } : {
      as: 'input'
    };
  }, [maxWidth, multi]);
  return {
    inputProps: inputProps,
    inputRef: inputRef,
    focus: focus,
    blur: blur
  };
}
var _default = exports.default = useInput;