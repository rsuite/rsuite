import { type Locale } from 'date-fns';
import { getSelectIndexGap, isCursorAfterMonth, getDatePattern } from '../DateInput';

export enum DateType {
  Start = 'Start',
  End = 'End'
}

interface SelectedStateOptions {
  /**
   * The input element
   */
  input: HTMLInputElement;

  /**
   * The direction of the arrow key, left or right
   */
  direction?: 'left' | 'right';

  /**
   * Format of the string is based on Unicode Technical Standard.
   * @see https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   */
  formatStr: string;

  /**
   * The format string of the range, which is used to calculate the selection range.
   */
  rangeFormatStr: string;

  /**
   * The locale object, date-fns locale object
   */
  localize: Locale['localize'];

  /**
   * The selected month, used to calculate the offset of the character selection range
   */
  selectedMonth: number | null;

  /**
   * The offset of the value, which is used to calculate the month.
   * This value will be changed when pressing the up and down arrow keys.
   */
  valueOffset?: number | null;

  /**
   * The date is rendered in string format according to format
   */
  dateString: string;

  /**
   * The character that separates two dates
   *
   * Only for `DateRangeInput`
   **/
  character: string;

  /**
   * The date type, start or end
   *
   * Only for `DateRangeInput`
   */
  dateType: DateType;
}

export function getInputSelectedState(options: SelectedStateOptions) {
  const {
    input,
    direction,
    formatStr,
    rangeFormatStr,
    localize,
    selectedMonth,
    valueOffset = 0,
    character,
    dateType,
    dateString
  } = options;

  const getPatternSelectedIndexes = (pattern: string) => {
    let selectionStart = 0;
    let selectionEnd = 0;

    if (dateType === DateType.Start) {
      selectionStart = rangeFormatStr.indexOf(pattern);
      selectionEnd = rangeFormatStr.split(character)[0].lastIndexOf(pattern) + 1;
    } else if (dateType === DateType.End) {
      const position = rangeFormatStr.indexOf(character) + character.length;

      selectionStart = rangeFormatStr.indexOf(pattern, position);
      selectionEnd = rangeFormatStr.lastIndexOf(pattern) + 1;
    }

    const endDateGap = dateString.indexOf(character) - rangeFormatStr.indexOf(character);

    // If the date type is end, and the end date is not selected, the selection range needs to be adjusted.
    if (dateType === DateType.End && endDateGap > 0) {
      selectionStart += endDateGap;
      selectionEnd += endDateGap;
    }

    const gap = getSelectIndexGap({ pattern, formatStr, valueOffset, selectedMonth, localize });

    const isSelectedMonth = pattern === 'M';
    const isNullMonth = selectedMonth === null && !(isSelectedMonth && valueOffset !== 0);

    // If the month is null and the valueOffset is 0, the month will not be updated, and the gap is 0 at this time.
    if (isNullMonth) {
      return { selectionStart, selectionEnd };
    }

    if (isSelectedMonth) {
      return {
        selectionStart,
        selectionEnd: selectionEnd + gap
      };
    }

    if (isCursorAfterMonth(selectionStart, formatStr)) {
      return {
        selectionStart: selectionStart + gap,
        selectionEnd: selectionEnd + gap
      };
    }

    return { selectionStart, selectionEnd };
  };

  if (typeof input.selectionEnd === 'number' && typeof input.selectionStart === 'number') {
    let index = input.selectionStart;

    let positionOffset = -1;

    if (direction === 'left') {
      index = input.selectionStart - 1;
    } else if (direction === 'right') {
      index = input.selectionEnd + 1;
      positionOffset = 1;
    }

    // The start position of the index of the end date
    const endDateIndex = dateString.indexOf(character) + character.length;
    const datePattern = getDatePattern({
      selectionIndex: dateType === DateType.End ? index - endDateIndex : index,
      positionOffset,
      formatStr,
      dateString,
      valueOffset,
      selectedMonth,
      localize
    });

    const indexes = getPatternSelectedIndexes(datePattern);

    return {
      selectedPattern: datePattern,
      ...indexes
    };
  }

  return {
    selectedPattern: 'y',
    selectionStart: 0,
    selectionEnd: 0
  };
}

export function getDateType(dateString: string, character: string, cursorIndex: number) {
  const splitIndex = dateString.indexOf(character);

  if (cursorIndex > splitIndex) {
    return DateType.End;
  }

  return DateType.Start;
}

export function isSwitchDateType(
  dateString: string,
  character: string,
  cursorIndex: number,
  direction: 'right' | 'left'
) {
  const characterIndex = dateString.indexOf(character);

  let startIndex = cursorIndex;
  let endIndex = startIndex + character.length;

  if (direction === 'left') {
    endIndex = cursorIndex;
    startIndex = endIndex - character.length;
  }

  // Check whether the cursor is a separator before and after
  if (dateString.substring(startIndex, endIndex) === character) {
    return true;
  }

  // Check whether the cursor is a number or letter before and after. If not, switch the date type.
  // eg: `2020年12月01日`, the cursor is behind 01, press the right key, and switch to the end date.
  if (direction === 'right') {
    if (!dateString.substring(cursorIndex, characterIndex).match(/[0-9a-zA-Z]/)) {
      return true;
    }
  }
  if (!dateString.substring(characterIndex, cursorIndex).match(/[0-9a-zA-Z]/)) {
    return true;
  }

  return false;
}
