import type { Locale, Month } from 'date-fns';
import {
  setYear,
  setMonth,
  setDate,
  setHours,
  setMinutes,
  setSeconds
} from '@/internals/utils/date';
import { safeSetSelection } from '@/internals/utils';

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
   * Format of the string is based on Unicode Technical Standard: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   */
  formatStr: string;

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
}

export function getPatternGroups(format: string, pattern: string) {
  return format.match(new RegExp(`(${pattern})+`))?.[0] || '';
}

interface SelectIndexGapOptions {
  pattern: string;
  formatStr: string;
  valueOffset: number | null;
  selectedMonth: number | null;
  localize: Locale['localize'];
}

export function getSelectIndexGap(options: SelectIndexGapOptions) {
  const { pattern, formatStr, valueOffset, selectedMonth, localize } = options;
  let gap = 0;

  const monthIsAbbreviated = formatStr.includes('MMM');
  const monthIsFull = formatStr.includes('MMMM');

  // If the month is abbreviated or full, the gap needs to be adjusted.
  if (monthIsAbbreviated || monthIsFull) {
    const isSelectedMonth = pattern === 'M';

    // If the selected is the month, and the valueOffset is null,
    // it means that the delete key is pressed, and the default pattern is displayed, and the gap is 0 at this time.
    if (isSelectedMonth && valueOffset === null) {
      return 0;
    }

    // If the month is null and the valueOffset is 0, the month will not be updated, and the gap is 0 at this time.
    if (selectedMonth === null && valueOffset === 0) {
      return 0;
    }

    let month = selectedMonth ? selectedMonth + (isSelectedMonth ? valueOffset || 0 : 0) : 1;

    if (month > 12) {
      month = 1;
    } else if (month === 0) {
      month = 12;
    }

    const monthStr = localize?.month((month - 1) as Month, {
      width: monthIsFull ? 'wide' : 'abbreviated'
    });
    gap = monthStr.length - (monthIsFull ? 4 : 3);
  }

  return gap;
}

interface DatePatternOptions {
  selectionIndex: number;
  positionOffset?: number;
  formatStr: string;
  dateString: string;
  valueOffset: number | null;
  selectedMonth: number | null;
  localize: Locale['localize'];
}

export function getDatePattern(options: DatePatternOptions) {
  const {
    selectionIndex,
    positionOffset = -1,
    formatStr,
    dateString,
    valueOffset,
    selectedMonth,
    localize
  } = options;

  let pattern = formatStr.charAt(selectionIndex || 0);

  if (selectionIndex < 0 || selectionIndex > dateString.length - 1) {
    pattern = formatStr.trim().charAt(0);

    return pattern;
  }

  let gap = 0;
  if (isCursorAfterMonth(selectionIndex, formatStr)) {
    gap = getSelectIndexGap({ pattern, formatStr, valueOffset, selectedMonth, localize });
  }

  pattern = formatStr.charAt(selectionIndex - gap);

  // If the pattern is not a letter, then get the pattern from the previous or next letter.
  if (!pattern.match(/[y|d|M|H|h|m|s|a]/)) {
    const nextIndex = selectionIndex + positionOffset;
    pattern = getDatePattern({ ...options, selectionIndex: nextIndex });
  }

  return pattern;
}

// Determine whether the cursor is after the month.
// If the currently operated field is after the month, the selected field needs to be moved backward.
export function isCursorAfterMonth(cursorIndex: number, formatStr: string) {
  return cursorIndex > formatStr.indexOf('M');
}

export function getInputSelectedState(options: SelectedStateOptions) {
  const {
    input,
    direction,
    formatStr,
    localize,
    selectedMonth,
    dateString,
    valueOffset = 0
  } = options;

  const getPatternSelectedIndexes = (pattern: string) => {
    const selectionStart = formatStr.indexOf(pattern);
    const selectionEnd = formatStr.lastIndexOf(pattern) + 1;
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
    let selectionIndex = input.selectionStart;

    let positionOffset = -1;

    if (direction === 'left') {
      selectionIndex = input.selectionStart - 1;
    } else if (direction === 'right') {
      selectionIndex = input.selectionEnd + 1;
      positionOffset = 1;
    }

    const datePattern = getDatePattern({
      selectionIndex,
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

export function validateDateTime(type: string, value: number) {
  switch (type) {
    case 'year':
      if (value < 1 || value > 9999) {
        return false;
      }
      break;
    case 'month':
      if (value < 1 || value > 12) {
        return false;
      }
      break;
    case 'day':
      if (value < 1 || value > 31) {
        return false;
      }
      break;
    case 'hour':
      if (value < 0 || value > 23) {
        return false;
      }
      break;
    case 'minute':
      if (value < 0 || value > 59) {
        return false;
      }
      break;
    case 'second':
      if (value < 0 || value > 59) {
        return false;
      }
      break;
    default:
      return false; // Invalid type
  }

  return true;
}

export function modifyDate(date: Date, type: string, value: number) {
  switch (type) {
    case 'year':
      return setYear(date, value);
    case 'month':
      return setMonth(date, value - 1);
    case 'day':
      return setDate(date, value);
    case 'hour':
      return setHours(date, value);
    case 'minute':
      return setMinutes(date, value);
    case 'second':
      return setSeconds(date, value);
  }

  return date;
}

export function useInputSelection(input: React.RefObject<any>) {
  return function setSelectionRange(selectionStart: number, selectionEnd: number) {
    const isTest = input.current.dataset.test === 'true';

    if (isTest) {
      safeSetSelection(input.current, selectionStart, selectionEnd);
      return;
    }

    requestAnimationFrame(() => {
      safeSetSelection(input.current, selectionStart, selectionEnd);
    });
  };
}
