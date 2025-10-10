'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = createTextMaskInputElement;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _isString = _interopRequireDefault(require("lodash/isString"));
var _isNumber = _interopRequireDefault(require("lodash/isNumber"));
var _adjustCaretPosition = _interopRequireDefault(require("./adjustCaretPosition"));
var _conformToMask2 = _interopRequireDefault(require("./conformToMask"));
var _utilities = require("./utilities");
var _utils = require("../internals/utils");
var emptyString = '';
var strObject = 'object';
function createTextMaskInputElement(config) {
  // Anything that we will need to keep between `update` calls, we will store in this `state` object.
  var state = {
    previousConformedValue: undefined,
    previousPlaceholder: undefined
  };
  return {
    state: state,
    // `update` is called by framework components whenever they want to update the `value` of the input element.
    // The caller can send a `rawValue` to be conformed and set on the input element. However, the default use-case
    // is for this to be read from the `inputElement` directly.
    update: function update(rawValue, _temp) {
      var _pipeResults, _pipeResults2;
      var _ref = _temp === void 0 ? config : _temp,
        inputElement = _ref.inputElement,
        providedMask = _ref.mask,
        guide = _ref.guide,
        pipe = _ref.pipe,
        _ref$placeholderChar = _ref.placeholderChar,
        placeholderChar = _ref$placeholderChar === void 0 ? _utilities.defaultPlaceholderChar : _ref$placeholderChar,
        _ref$keepCharPosition = _ref.keepCharPositions,
        keepCharPositions = _ref$keepCharPosition === void 0 ? false : _ref$keepCharPosition,
        _ref$showMask = _ref.showMask,
        showMask = _ref$showMask === void 0 ? false : _ref$showMask;
      // if `rawValue` is `undefined`, read from the `inputElement`
      if (typeof rawValue === 'undefined') {
        rawValue = inputElement.value;
      }

      // If `rawValue` equals `state.previousConformedValue`, we don't need to change anything. So, we return.
      // This check is here to handle controlled framework components that repeat the `update` call on every render.
      if (rawValue === state.previousConformedValue) {
        return;
      }

      // Text Mask accepts masks that are a combination of a `mask` and a `pipe` that work together. If such a `mask` is
      // passed, we destructure it below, so the rest of the code can work normally as if a separate `mask` and a `pipe`
      // were passed.
      if (typeof providedMask === strObject && providedMask.pipe !== undefined && providedMask.mask !== undefined) {
        pipe = providedMask.pipe;
        providedMask = providedMask.mask;
      }

      // The `placeholder` is an essential piece of how Text Mask works. For a mask like `(111)`, the placeholder would
      // be `(___)` if the `placeholderChar` is set to `_`.
      var placeholder;

      // We don't know what the mask would be yet. If it is an array, we take it as is, but if it's a function, we will
      // have to call that function to get the mask array.
      var mask;

      // If the provided mask is an array, we can call `convertMaskToPlaceholder` here once and we'll always have the
      // correct `placeholder`.
      if (providedMask instanceof Array) {
        placeholder = (0, _utilities.convertMaskToPlaceholder)(providedMask, placeholderChar);
      }

      // In framework components that support reactivity, it's possible to turn off masking by passing
      // `false` for `mask` after initialization. See https://github.com/text-mask/text-mask/pull/359
      if (providedMask === false) {
        return;
      }

      // We check the provided `rawValue` before moving further.
      // If it's something we can't work with `getSafeRawValue` will throw.
      var safeRawValue = getSafeRawValue(rawValue);

      // `selectionEnd` indicates to us where the caret position is after the user has typed into the input
      var currentCaretPosition = inputElement.selectionEnd;

      // We need to know what the `previousConformedValue` and `previousPlaceholder` is from the previous `update` call
      var previousConformedValue = state.previousConformedValue,
        previousPlaceholder = state.previousPlaceholder;
      var caretTrapIndexes;

      // If the `providedMask` is a function. We need to call it at every `update` to get the `mask` array.
      // Then we also need to get the `placeholder`
      if (typeof providedMask === 'function') {
        mask = providedMask(safeRawValue, {
          currentCaretPosition: currentCaretPosition,
          previousConformedValue: previousConformedValue,
          placeholderChar: placeholderChar
        });

        // disable masking if `mask` is `false`
        if (mask === false) {
          return;
        }

        // mask functions can setup caret traps to have some control over how the caret moves. We need to process
        // the mask for any caret traps. `processCaretTraps` will remove the caret traps from the mask and return
        // the indexes of the caret traps.
        var _processCaretTraps = (0, _utilities.processCaretTraps)(mask),
          maskWithoutCaretTraps = _processCaretTraps.maskWithoutCaretTraps,
          indexes = _processCaretTraps.indexes;
        mask = maskWithoutCaretTraps; // The processed mask is what we're interested in
        caretTrapIndexes = indexes; // And we need to store these indexes because they're needed by `adjustCaretPosition`

        placeholder = (0, _utilities.convertMaskToPlaceholder)(mask, placeholderChar);

        // If the `providedMask` is not a function, we just use it as-is.
      } else {
        mask = providedMask;
      }

      // The following object will be passed to `conformToMask` to determine how the `rawValue` will be conformed
      var conformToMaskConfig = {
        previousConformedValue: previousConformedValue,
        guide: guide,
        placeholderChar: placeholderChar,
        pipe: pipe,
        placeholder: placeholder,
        currentCaretPosition: currentCaretPosition,
        keepCharPositions: keepCharPositions
      };

      // `conformToMask` returns `conformedValue` as part of an object for future API flexibility
      var _conformToMask = (0, _conformToMask2.default)(safeRawValue, mask, conformToMaskConfig),
        conformedValue = _conformToMask.conformedValue;

      // The following few lines are to support the `pipe` feature.
      var piped = typeof pipe === 'function';
      var pipeResults = {};

      // If `pipe` is a function, we call it.
      if (piped) {
        // `pipe` receives the `conformedValue` and the configurations with which `conformToMask` was called.
        pipeResults = pipe(conformedValue, (0, _extends2.default)({
          rawValue: safeRawValue
        }, conformToMaskConfig));

        // `pipeResults` should be an object. But as a convenience, we allow the pipe author to just return `false` to
        // indicate rejection. Or return just a string when there are no piped characters.
        // If the `pipe` returns `false` or a string, the block below turns it into an object that the rest
        // of the code can work with.
        if (typeof pipeResults === 'boolean' && pipeResults === false) {
          // If the `pipe` rejects `conformedValue`, we use the `previousConformedValue`, and set `rejected` to `true`.
          pipeResults = {
            value: previousConformedValue,
            rejected: true
          };
        } else if ((0, _isString.default)(pipeResults)) {
          pipeResults = {
            value: pipeResults
          };
        }
      }

      // Before we proceed, we need to know which conformed value to use, the one returned by the pipe or the one
      // returned by `conformToMask`.
      var finalConformedValue = piped ? (_pipeResults = pipeResults) === null || _pipeResults === void 0 ? void 0 : _pipeResults.value : conformedValue;

      // After determining the conformed value, we will need to know where to set
      // the caret position. `adjustCaretPosition` will tell us.
      var adjustedCaretPosition = (0, _adjustCaretPosition.default)({
        previousConformedValue: previousConformedValue,
        previousPlaceholder: previousPlaceholder,
        conformedValue: finalConformedValue,
        placeholder: placeholder,
        rawValue: safeRawValue,
        currentCaretPosition: currentCaretPosition,
        placeholderChar: placeholderChar,
        indexesOfPipedChars: (_pipeResults2 = pipeResults) === null || _pipeResults2 === void 0 ? void 0 : _pipeResults2.indexesOfPipedChars,
        caretTrapIndexes: caretTrapIndexes
      });

      // Text Mask sets the input value to an empty string when the condition below is set. It provides a better UX.
      var inputValueShouldBeEmpty = finalConformedValue === placeholder && adjustedCaretPosition === 0;
      var emptyValue = showMask ? placeholder : emptyString;
      var inputElementValue = inputValueShouldBeEmpty ? emptyValue : finalConformedValue;
      state.previousConformedValue = inputElementValue; // store value for access for next time
      state.previousPlaceholder = placeholder;

      // In some cases, this `update` method will be repeatedly called with a raw value that has already been conformed
      // and set to `inputElement.value`. The below check guards against needlessly readjusting the input state.
      // See https://github.com/text-mask/text-mask/issues/231
      if (inputElement.value === inputElementValue) {
        return;
      }
      inputElement.value = inputElementValue; // set the input value

      if (typeof adjustedCaretPosition === 'number') {
        (0, _utils.safeSetSelection)(inputElement, adjustedCaretPosition, adjustedCaretPosition); // adjust caret position
      }
    }
  };
}
function getSafeRawValue(inputValue) {
  if ((0, _isString.default)(inputValue)) {
    return inputValue;
  } else if ((0, _isNumber.default)(inputValue)) {
    return String(inputValue);
  } else if (inputValue === undefined || inputValue === null) {
    return emptyString;
  } else {
    throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n " + JSON.stringify(inputValue));
  }
}