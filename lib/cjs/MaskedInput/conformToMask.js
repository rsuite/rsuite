'use client';
"use strict";

exports.__esModule = true;
exports.default = conformToMask;
exports.isArray = isArray;
var _utilities = require("./utilities");
function isArray(value) {
  return Array.isArray && Array.isArray(value) || value instanceof Array;
}
function conformToMask(rawValue, mask, config) {
  if (rawValue === void 0) {
    rawValue = '';
  }
  if (mask === void 0) {
    mask = [];
  }
  if (config === void 0) {
    config = {};
  }
  if (!isArray(mask)) {
    // If someone passes a function as the mask property, we should call the
    // function to get the mask array - Normally this is handled by the
    // `createTextMaskInputElement:update` function - this allows mask functions
    // to be used directly with `conformToMask`
    if (typeof mask === 'function') {
      // call the mask function to get the mask array
      mask = mask(rawValue, config);

      // mask functions can setup caret traps to have some control over how the caret moves. We need to process
      // the mask for any caret traps. `processCaretTraps` will remove the caret traps from the mask
      mask = (0, _utilities.processCaretTraps)(mask).maskWithoutCaretTraps;
    } else {
      throw new Error('Text-mask:conformToMask; The mask property must be an array.');
    }
  }

  // These configurations tell us how to conform the mask
  var _config = config,
    _config$guide = _config.guide,
    guide = _config$guide === void 0 ? true : _config$guide,
    _config$previousConfo = _config.previousConformedValue,
    previousConformedValue = _config$previousConfo === void 0 ? '' : _config$previousConfo,
    _config$placeholderCh = _config.placeholderChar,
    placeholderChar = _config$placeholderCh === void 0 ? _utilities.defaultPlaceholderChar : _config$placeholderCh,
    _config$placeholder = _config.placeholder,
    placeholder = _config$placeholder === void 0 ? (0, _utilities.convertMaskToPlaceholder)(mask, placeholderChar) : _config$placeholder,
    _config$currentCaretP = _config.currentCaretPosition,
    currentCaretPosition = _config$currentCaretP === void 0 ? 0 : _config$currentCaretP,
    keepCharPositions = _config.keepCharPositions;

  // The configs below indicate that the user wants the algorithm to work in *no guide* mode
  var suppressGuide = guide === false && previousConformedValue !== undefined;

  // Calculate lengths once for performance
  var rawValueLength = rawValue.length;
  var previousConformedValueLength = previousConformedValue.length;
  var placeholderLength = placeholder.length;
  var maskLength = mask.length;

  // This tells us the number of edited characters and the direction in which they were edited (+/-)
  var editDistance = rawValueLength - previousConformedValueLength;

  // In *no guide* mode, we need to know if the user is trying to add a character or not
  var isAddition = editDistance > 0;

  // Tells us the index of the first change. For (438) 394-4938 to (38) 394-4938, that would be 1
  var indexOfFirstChange = currentCaretPosition + (isAddition ? -editDistance : 0);

  // We're also gonna need the index of last change, which we can derive as follows...
  var indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);

  // If `conformToMask` is configured to keep character positions, that is, for mask 111, previous value
  // _2_ and raw value 3_2_, the new conformed value should be 32_, not 3_2 (default behavior). That's in the case of
  // addition. And in the case of deletion, previous value _23, raw value _3, the new conformed string should be
  // __3, not _3_ (default behavior)
  //
  // The next block of logic handles keeping character positions for the case of deletion. (Keeping
  // character positions for the case of addition is further down since it is handled differently.)
  // To do this, we want to compensate for all characters that were deleted
  if (keepCharPositions === true && !isAddition) {
    // We will be storing the new placeholder characters in this variable.
    var compensatingPlaceholderChars = '';

    // For every character that was deleted from a placeholder position, we add a placeholder char
    for (var i = indexOfFirstChange; i < indexOfLastChange; i++) {
      if (placeholder[i] === placeholderChar) {
        compensatingPlaceholderChars += placeholderChar;
      }
    }

    // Now we trick our algorithm by modifying the raw value to make it contain additional placeholder characters
    // That way when the we start laying the characters again on the mask, it will keep the non-deleted characters
    // in their positions.
    rawValue = rawValue.slice(0, indexOfFirstChange) + compensatingPlaceholderChars + rawValue.slice(indexOfFirstChange, rawValueLength);
  }

  // Convert `rawValue` string to an array, and mark characters based on whether they are newly added or have
  // existed in the previous conformed value. Identifying new and old characters is needed for `conformToMask`
  // to work if it is configured to keep character positions.
  var rawValueArr = rawValue.split('').map(function (char, i) {
    return {
      char: char,
      isNew: i >= indexOfFirstChange && i < indexOfLastChange
    };
  });

  // The loop below removes masking characters from user input. For example, for mask
  // `00 (111)`, the placeholder would be `00 (___)`. If user input is `00 (234)`, the loop below
  // would remove all characters but `234` from the `rawValueArr`. The rest of the algorithm
  // then would lay `234` on top of the available placeholder positions in the mask.
  for (var _i = rawValueLength - 1; _i >= 0; _i--) {
    var char = rawValueArr[_i].char;
    if (char !== placeholderChar) {
      var shouldOffset = _i >= indexOfFirstChange && previousConformedValueLength === maskLength;
      if (char === placeholder[shouldOffset ? _i - editDistance : _i]) {
        rawValueArr.splice(_i, 1);
      }
    }
  }

  // This is the variable that we will be filling with characters as we figure them out
  // in the algorithm below
  var conformedValue = '';
  var someCharsRejected = false;

  // Ok, so first we loop through the placeholder looking for placeholder characters to fill up.
  placeholderLoop: for (var _i2 = 0; _i2 < placeholderLength; _i2++) {
    var charInPlaceholder = placeholder[_i2];

    // We see one. Let's find out what we can put in it.
    if (charInPlaceholder === placeholderChar) {
      // But before that, do we actually have any user characters that need a place?
      if (rawValueArr.length > 0) {
        // We will keep chipping away at user input until either we run out of characters
        // or we find at least one character that we can map.
        while (rawValueArr.length > 0) {
          // Let's retrieve the first user character in the queue of characters we have left
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          var _ref = rawValueArr.shift(),
            rawValueChar = _ref.char,
            isNew = _ref.isNew;

          // If the character we got from the user input is a placeholder character (which happens
          // regularly because user input could be something like (540) 90_-____, which includes
          // a bunch of `_` which are placeholder characters) and we are not in *no guide* mode,
          // then we map this placeholder character to the current spot in the placeholder
          if (rawValueChar === placeholderChar && suppressGuide !== true) {
            conformedValue += placeholderChar;

            // And we go to find the next placeholder character that needs filling
            continue placeholderLoop;

            // Else if, the character we got from the user input is not a placeholder, let's see
            // if the current position in the mask can accept it.
          } else if (mask[_i2].test(rawValueChar)) {
            // we map the character differently based on whether we are keeping character positions or not.
            // If any of the conditions below are met, we simply map the raw value character to the
            // placeholder position.
            if (keepCharPositions !== true || isNew === false || previousConformedValue === '' || guide === false || !isAddition) {
              conformedValue += rawValueChar;
            } else {
              // We enter this block of code if we are trying to keep character positions and none of the conditions
              // above is met. In this case, we need to see if there's an available spot for the raw value character
              // to be mapped to. If we couldn't find a spot, we will discard the character.
              //
              // For example, for mask `1111`, previous conformed value `_2__`, raw value `942_2__`. We can map the
              // `9`, to the first available placeholder position, but then, there are no more spots available for the
              // `4` and `2`. So, we discard them and end up with a conformed value of `92__`.
              var rawValueArrLength = rawValueArr.length;
              var indexOfNextAvailablePlaceholderChar = null;

              // Let's loop through the remaining raw value characters. We are looking for either a suitable spot, ie,
              // a placeholder character or a non-suitable spot, ie, a non-placeholder character that is not new.
              // If we see a suitable spot first, we store its position and exit the loop. If we see a non-suitable
              // spot first, we exit the loop and our `indexOfNextAvailablePlaceholderChar` will stay as `null`.
              for (var _i3 = 0; _i3 < rawValueArrLength; _i3++) {
                var charData = rawValueArr[_i3];
                if (charData.char !== placeholderChar && charData.isNew === false) {
                  break;
                }
                if (charData.char === placeholderChar) {
                  indexOfNextAvailablePlaceholderChar = _i3;
                  break;
                }
              }

              // If `indexOfNextAvailablePlaceholderChar` is not `null`, that means the character is not blocked.
              // We can map it. And to keep the character positions, we remove the placeholder character
              // from the remaining characters
              if (indexOfNextAvailablePlaceholderChar !== null) {
                conformedValue += rawValueChar;
                rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);

                // If `indexOfNextAvailablePlaceholderChar` is `null`, that means the character is blocked. We have to
                // discard it.
              } else {
                _i2--;
              }
            }

            // Since we've mapped this placeholder position. We move on to the next one.
            continue placeholderLoop;
          } else {
            someCharsRejected = true;
          }
        }
      }

      // We reach this point when we've mapped all the user input characters to placeholder
      // positions in the mask. In *guide* mode, we append the left over characters in the
      // placeholder to the `conformedString`, but in *no guide* mode, we don't wanna do that.
      //
      // That is, for mask `(111)` and user input `2`, we want to return `(2`, not `(2__)`.
      if (suppressGuide === false) {
        conformedValue += placeholder.substr(_i2, placeholderLength);
      }

      // And we break
      break;

      // Else, the charInPlaceholder is not a placeholderChar. That is, we cannot fill it
      // with user input. So we just map it to the final output
    } else {
      conformedValue += charInPlaceholder;
    }
  }

  // The following logic is needed to deal with the case of deletion in *no guide* mode.
  //
  // Consider the silly mask `(111) /// 1`. What if user tries to delete the last placeholder
  // position? Something like `(589) /// `. We want to conform that to `(589`. Not `(589) /// `.
  // That's why the logic below finds the last filled placeholder character, and removes everything
  // from that point on.
  if (suppressGuide && isAddition === false) {
    var indexOfLastFilledPlaceholderChar = null;

    // Find the last filled placeholder position and substring from there
    for (var _i4 = 0; _i4 < conformedValue.length; _i4++) {
      if (placeholder[_i4] === placeholderChar) {
        indexOfLastFilledPlaceholderChar = _i4;
      }
    }
    if (indexOfLastFilledPlaceholderChar !== null) {
      // We substring from the beginning until the position after the last filled placeholder char.
      conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
    } else {
      // If we couldn't find `indexOfLastFilledPlaceholderChar` that means the user deleted
      // the first character in the mask. So we return an empty string.
      conformedValue = '';
    }
  }
  return {
    conformedValue: conformedValue,
    meta: {
      someCharsRejected: someCharsRejected
    }
  };
}