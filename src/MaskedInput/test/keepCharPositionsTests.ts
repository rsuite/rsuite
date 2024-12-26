import { getLineNumber } from './testParameters';

export default [
  {
    line: getLineNumber(),

    previousConformedValue: '(650) 394-2911',
    rawValue: '(650) 394-211',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 11,

    conformedValue: '(650) 394-2_11',
    adjustedCaretPosition: 11
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(650) 394-2_11',
    rawValue: '(650) 94-2_11',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 6,

    conformedValue: '(650) _94-2_11',
    adjustedCaretPosition: 6
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(650) 394-2_11',
    rawValue: '(650) 3942_11',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 9,

    conformedValue: '(650) 394-2_11',
    adjustedCaretPosition: 9
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(650) 394-2_11',
    rawValue: '(650) 3-2_11',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 7,

    conformedValue: '(650) 3__-2_11',
    adjustedCaretPosition: 7
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(650) 394-2_11',
    rawValue: '(65-2_11',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 3,

    conformedValue: '(65_) ___-2_11',
    adjustedCaretPosition: 3

    // ##########################
    // Addition operation
    // ##########################
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(650) ___-3___',
    rawValue: '(650) 4___-3___',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 7,

    conformedValue: '(650) 4__-3___',
    adjustedCaretPosition: 7
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(650) ___-3___',
    rawValue: '(650) __-_-3___',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 9,

    conformedValue: '(650) ___-3___',
    adjustedCaretPosition: 8
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(650) ___-3___',
    rawValue: '(650) __-23_-3___',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 11,

    conformedValue: '(650) __2-3___',
    adjustedCaretPosition: 11
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(902) 394-8__3',
    rawValue: '(902) 394-38__3',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 11,

    conformedValue: '(902) 394-8__3',
    adjustedCaretPosition: 11
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(830) 203-___3',
    rawValue: '(830) 203dkla8xxx-___3',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 17,

    conformedValue: '(830) 203-8__3',
    adjustedCaretPosition: 11
  },
  {
    line: getLineNumber(),

    previousConformedValue: '(830) 203-___3',
    rawValue: '(830) 2038-___3',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 10,

    conformedValue: '(830) 203-8__3',
    adjustedCaretPosition: 11
  },
  {
    // ##########################
    // Blocker character
    // ##########################
    line: getLineNumber(),

    previousConformedValue: '(830) 203-4__3',
    rawValue: '(830) 2038-4__3',
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    currentCaretPosition: 10,

    conformedValue: '(830) 203-4__3',
    adjustedCaretPosition: 11
  }
];
