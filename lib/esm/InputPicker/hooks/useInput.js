'use client';
import { useRef, useCallback, useMemo } from 'react';
import useMaxWidth from "./useMaxWidth.js";
import InputAutosize from "../InputAutosize.js";
var INPUT_MARGIN_RIGHT = 60;
function useInput(props) {
  var multi = props.multi,
    triggerRef = props.triggerRef;
  var inputRef = useRef();
  var maxWidth = useMaxWidth(triggerRef);
  var getInput = useCallback(function () {
    var _inputRef$current;
    return multi ? (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.input : inputRef.current;
  }, [multi]);
  var focus = useCallback(function () {
    var _getInput;
    (_getInput = getInput()) === null || _getInput === void 0 || _getInput.focus();
  }, [getInput]);
  var blur = useCallback(function () {
    var _getInput2;
    (_getInput2 = getInput()) === null || _getInput2 === void 0 || _getInput2.blur();
  }, [getInput]);
  var inputProps = useMemo(function () {
    return multi ? {
      inputStyle: {
        maxWidth: maxWidth - INPUT_MARGIN_RIGHT
      },
      as: InputAutosize
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
export default useInput;