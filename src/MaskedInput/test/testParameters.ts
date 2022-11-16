import _ from 'lodash/fp';
import { convertMaskToPlaceholder } from '../utilities';

const alphabetic = /^[A-Z]+$/i;
export const getLineNumber = () => {
  const err = new Error();
  const stack = err['stack'] as string;
  const stackLines = stack.split('\n');
  const calleeLine = stackLines[2];
  let lineNumber = 0;

  if (calleeLine) {
    const l = calleeLine.match(/\(.+:(\d+):\d+\)/);
    lineNumber = l && l[1] ? parseInt(l[1], 10) : 0;
  }

  return lineNumber;
};

// export default _.filter((t) => false, [{
export default _.filter(
  t => t,
  [
    {
      // export default _.filter((t) => t.only, [{
      line: getLineNumber(),

      previousConformedValue: '(___)',
      rawValue: '(3___)',
      mask: ['(', /\d/, /\d/, /\d/, ')'],
      currentCaretPosition: 2,

      conformedValue: '(3__)',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '$111,222',
      previousPlaceholder: '$___,___',
      rawValue: '$111,22',
      mask: ['$', /\d/, /\d/, ',', /\d/, /\d/, /\d/],
      currentCaretPosition: 5,

      conformedValue: '$11,122',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '$12,345',
      previousPlaceholder: '$__,___',
      rawValue: '$12,45',
      mask: ['$', /\d/, ',', /\d/, /\d/, /\d/],
      currentCaretPosition: 4,

      conformedValue: '$1,245',
      adjustedCaretPosition: 4

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '$1,234,567',
      previousPlaceholder: '$_,___,___',
      rawValue: '$1,234,57',
      mask: ['$', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/],
      currentCaretPosition: 8,

      conformedValue: '$123,457',
      adjustedCaretPosition: 7

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '$1,234,567',
      previousPlaceholder: '$_,___,___',
      rawValue: '$1,234,56',
      mask: ['$', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/],
      currentCaretPosition: 9,

      conformedValue: '$123,456',
      adjustedCaretPosition: 8

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '$1,234,567',
      previousPlaceholder: '$_,___,___',
      rawValue: '$1,34,567',
      mask: ['$', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/],
      currentCaretPosition: 3,

      conformedValue: '$134,567',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '___',
      rawValue: '1___',
      mask: [/\d/, /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '1__',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(12_) _',
      rawValue: '(12f_) _',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/],
      currentCaretPosition: 4,

      conformedValue: '(12_) _',
      adjustedCaretPosition: 3

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(___) ___-____',
      rawValue: '(1___) ___-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '(1__) ___-____',
      adjustedCaretPosition: 2
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(1__) ___-3___',
      rawValue: '(1__) ___-___',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 10,

      conformedValue: '(1__) ___-____',
      adjustedCaretPosition: 9

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(1__) ___-3___',
      rawValue: '(12__) ___-3___',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 3,

      conformedValue: '(12_) ___-_3__',
      adjustedCaretPosition: 3
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(333) ___-____',
      rawValue: '(3333) ___-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '(333) 3__-____',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(123) 948-____',
      rawValue: '(123) 94-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 8,

      conformedValue: '(123) 94_-____',
      adjustedCaretPosition: 8

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(__4) 444-____',
      rawValue: '(__4) 44-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 7,

      conformedValue: '(__4) 44_-____',
      adjustedCaretPosition: 7
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(__4) 44_-____',
      rawValue: '(__4) 444_-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 8,

      conformedValue: '(__4) 444-____',
      adjustedCaretPosition: 8
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(__4) 444-____',
      rawValue: '(__4) 444-___',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 10,

      conformedValue: '(__4) 444-____',
      adjustedCaretPosition: 9

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(__4) 444-____',
      rawValue: '(__4) 444____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 9,

      conformedValue: '(__4) 444-____',
      adjustedCaretPosition: 9

      // only: true,
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(__4) 444-____',
      rawValue: '(__4) 44-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 8,

      conformedValue: '(__4) 44_-____',
      adjustedCaretPosition: 8
      // only: true,
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(505) ___-____',
      rawValue: '(505 ___-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 4,

      conformedValue: '(505) ___-____',
      adjustedCaretPosition: 4

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(505) ___-____',
      rawValue: '(505) __-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 6,

      conformedValue: '(505) ___-____',
      adjustedCaretPosition: 4
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(333) 333-3___',
      rawValue: '(33) 333-3___',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 3,

      conformedValue: '(333) 333-____',
      adjustedCaretPosition: 3
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(___) ___-____',
      rawValue: '5(___) ___-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '(5__) ___-____',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(000) ___-____',
      rawValue: '(00) ___-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '(00_) ___-____',
      adjustedCaretPosition: 2
    },
    {
      line: getLineNumber(),

      previousConformedValue: '44/__',
      rawValue: '4/__',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '4_/__',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/],
      previousConformedValue: '(124) 3',
      rawValue: '(124) ',
      currentCaretPosition: 6,

      conformedValue: '(124) _',
      adjustedCaretPosition: 4

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(449) _',
      rawValue: '(4495) _',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/],
      currentCaretPosition: 5,

      conformedValue: '(449) 5',
      adjustedCaretPosition: 7

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(___) ___-____',
      rawValue: '(__4_) ___-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 4,

      conformedValue: '(__4) ___-____',
      adjustedCaretPosition: 6

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '1__',
      rawValue: '11__',
      mask: [/\d/, /\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '11_',
      adjustedCaretPosition: 2

      //only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '11_',
      rawValue: '111_',
      mask: [/\d/, /\d/, /\d/],
      currentCaretPosition: 3,

      conformedValue: '111',
      adjustedCaretPosition: 3
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(___)',
      rawValue: '(3___)',
      mask: ['(', /\d/, /\d/, /\d/, ')'],
      currentCaretPosition: 2,

      conformedValue: '(3__)',
      adjustedCaretPosition: 2

      //only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '___',
      rawValue: '1___',
      mask: [/\d/, /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '1__',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: '1__',
      rawValue: '11__',
      mask: [/\d/, /\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '11_',
      adjustedCaretPosition: 2

      //only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(12_) 7',
      rawValue: '(132_) 7',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/],
      currentCaretPosition: 3,

      conformedValue: '(132) _',
      adjustedCaretPosition: 3

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(___) ___/____',
      rawValue: '5(___) ___/____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '(5__) ___/____',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '3333',
      rawValue: '2938',
      mask: [/\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 4,

      conformedValue: '2938',
      adjustedCaretPosition: 4

      //only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(132) 7',
      rawValue: '(12) 7',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/],
      currentCaretPosition: 2,

      conformedValue: '(127) _',
      adjustedCaretPosition: 2
    },
    {
      line: getLineNumber(),

      previousConformedValue: '__/__/____',
      rawValue: '1__/__/____',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '1_/__/____',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: '1_/__/____',
      rawValue: '11_/__/____',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 2,
      conformedValue: '11/__/____',
      adjustedCaretPosition: 3
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '1111',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 4,

      conformedValue: '11/11/____',
      adjustedCaretPosition: 6
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '23840957',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 8,

      conformedValue: '23/84/0957',
      adjustedCaretPosition: 10
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '2384095',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 7,

      conformedValue: '23/84/095_',
      adjustedCaretPosition: 9
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '2',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '2_/__',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '777',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 3,

      conformedValue: '(777) ___-____',
      adjustedCaretPosition: 6

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '7771',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 4,

      conformedValue: '(777) 1__-____',
      adjustedCaretPosition: 7
    },
    {
      line: getLineNumber(),

      previousConformedValue: '1_/__/____',
      rawValue: '1_/__/___1_',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 10,

      conformedValue: '1_/__/___1',
      adjustedCaretPosition: 10

      //only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '1_/1_/____',
      rawValue: '1_/1__/___1',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 5,

      conformedValue: '1_/1_/____',
      adjustedCaretPosition: 4

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(1__) ___-____',
      rawValue: '(d1__) ___-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '(1__) ___-____',
      adjustedCaretPosition: 1

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '12/32',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 5,

      conformedValue: '12/32',
      adjustedCaretPosition: 5
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '__/32',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 5,

      conformedValue: '__/32',
      adjustedCaretPosition: 5,

      skips: [
        'adjustCaretPosition' // won't fix
      ]
    },
    {
      line: getLineNumber(),

      previousConformedValue: '__/__/____',
      rawValue: '1__/__/____',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '1_/__/____',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: '22/2_',
      rawValue: '2/2_',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '22/__',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: '(222) 2__-____',
      rawValue: '(22) 2__-____',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '(222) ___-____',
      adjustedCaretPosition: 0

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '__/2_',
      rawValue: '_2_/2_',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '_2/_2',
      adjustedCaretPosition: 3
    },
    {
      line: getLineNumber(),

      previousConformedValue: '__/2_',
      rawValue: '_/2_',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 0,

      conformedValue: '_2/__',
      adjustedCaretPosition: 0

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '1',
      mask: ['('],
      currentCaretPosition: 1,

      conformedValue: '(',
      adjustedCaretPosition: 0,

      skips: [
        // React component sets the conformed string to empty string, "" when result matches placeholder by design
        'integrations:react',
        'adjustCaretPosition'
      ]
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '2',
      mask: [/\d/],
      currentCaretPosition: 1,

      conformedValue: '2',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '__/22',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 5,

      conformedValue: '__/22',
      adjustedCaretPosition: 5,

      skips: [
        'adjustCaretPosition' // won't fix
      ]
    },
    {
      line: getLineNumber(),

      previousConformedValue: '__/22',
      rawValue: '2__/22',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '2_/_2',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '22',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '22/__',
      adjustedCaretPosition: 3
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '222',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 3,

      conformedValue: '22/2_',
      adjustedCaretPosition: 4
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '777777',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 6,

      conformedValue: '77/77',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '222/1',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 5,

      conformedValue: '22/21',
      adjustedCaretPosition: 5
    },
    {
      line: getLineNumber(),

      previousConformedValue: '__/__',
      rawValue: '__5/__',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 3,

      conformedValue: '__/5_',
      adjustedCaretPosition: 4

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '8_/4_5/222_1',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 1,

      conformedValue: '8_/4_/5222',
      adjustedCaretPosition: 10,

      skips: [
        'adjustCaretPosition' // won't fix
      ]
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '8293847/4_2/222_1',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 17,

      conformedValue: '82/93/8474',
      adjustedCaretPosition: 10
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '0/22',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 4,

      conformedValue: '02/2_',
      adjustedCaretPosition: 4
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '/22',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      currentCaretPosition: 3,

      conformedValue: '22/__',
      adjustedCaretPosition: 3
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '22/3/995',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      currentCaretPosition: 8,

      conformedValue: '22/39/95__',
      adjustedCaretPosition: 8

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '2d',
      mask: [/\d/, /\d/],
      currentCaretPosition: 2,

      conformedValue: '2_',
      adjustedCaretPosition: 1

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '(123) 3',
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/],
      currentCaretPosition: 7,

      conformedValue: '(123) 3',
      adjustedCaretPosition: 7

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: '(123) 3',
      mask: [alphabetic, /\d/, alphabetic, ' ', alphabetic, /\d/, alphabetic],
      currentCaretPosition: 7,

      conformedValue: '___ ___',
      adjustedCaretPosition: 0

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: '',
      rawValue: 'M',
      mask: [alphabetic, /\d/, alphabetic, ' ', alphabetic, /\d/, alphabetic],
      currentCaretPosition: 1,

      conformedValue: 'M__ ___',
      adjustedCaretPosition: 1
    },
    {
      line: getLineNumber(),

      previousConformedValue: 'M__ ___',
      rawValue: 'M2__ ___',
      mask: [alphabetic, /\d/, alphabetic, ' ', alphabetic, /\d/, alphabetic],
      currentCaretPosition: 2,

      conformedValue: 'M2_ ___',
      adjustedCaretPosition: 2
    },
    {
      line: getLineNumber(),

      previousConformedValue: 'M__ ___',
      rawValue: 'M2j_ ___',
      mask: [alphabetic, /\d/, alphabetic, ' ', alphabetic, /\d/, alphabetic],
      currentCaretPosition: 3,

      conformedValue: 'M2j ___',
      adjustedCaretPosition: 4
    },
    {
      line: getLineNumber(),

      previousConformedValue: 'M2j ___',
      rawValue: 'M2j __2_',
      mask: [alphabetic, /\d/, alphabetic, ' ', alphabetic, /\d/, alphabetic],
      currentCaretPosition: 7,

      conformedValue: 'M2j ___',
      adjustedCaretPosition: 6

      // only: true
    },
    {
      line: getLineNumber(),

      previousConformedValue: 'M2j ___',
      rawValue: 'M2j __R_',
      mask: [alphabetic, /\d/, alphabetic, ' ', alphabetic, /\d/, alphabetic],
      currentCaretPosition: 7,

      conformedValue: 'M2j __R',
      adjustedCaretPosition: 7
    },
    {
      line: getLineNumber(),

      previousConformedValue: 'M__ ___',
      rawValue: 'M2j_ ___',
      mask: [alphabetic, /\d/, alphabetic, ' ', alphabetic, /\d/, alphabetic],
      currentCaretPosition: 3,

      conformedValue: 'M2j ___',
      adjustedCaretPosition: 4
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '(1__)',
      rawValue: '(21__)',
      currentCaretPosition: 2,

      conformedValue: '(21_)',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/],
      previousConformedValue: '(323) ___',
      rawValue: '(3243) ___',
      currentCaretPosition: 4,

      conformedValue: '(324) 3__',
      adjustedCaretPosition: 6

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '(1__)',
      rawValue: '(21__)',
      currentCaretPosition: 2,

      conformedValue: '(21_)',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '',
      rawValue: '1',
      currentCaretPosition: 1,

      conformedValue: '(1__)',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '(290) 382-3039',
      rawValue: '(290) 38-3039',
      currentCaretPosition: 8,

      conformedValue: '(290) 383-039_',
      adjustedCaretPosition: 8
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '',
      rawValue: '(',
      currentCaretPosition: 1,

      conformedValue: '(___) ___-____',
      adjustedCaretPosition: 1

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '(395) 834-____',
      rawValue: '(395) 34-____',
      currentCaretPosition: 6,

      conformedValue: '(395) 34_-____',
      adjustedCaretPosition: 4

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '(1__) ___-____',
      rawValue: '(__) ___-____',
      currentCaretPosition: 1,

      conformedValue: '(___) ___-____',
      adjustedCaretPosition: 0

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [alphabetic, /\d/, alphabetic, ' ', alphabetic, /\d/, alphabetic],
      previousConformedValue: '',
      rawValue: '5',
      currentCaretPosition: 1,

      conformedValue: '___ ___',
      adjustedCaretPosition: 0

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['0', '0', ' ', '(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '00 (___)',
      rawValue: '00 (1___)',
      currentCaretPosition: 5,

      conformedValue: '00 (1__)',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [/\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '3333',
      rawValue: '2',
      currentCaretPosition: 1,

      conformedValue: '2___',
      adjustedCaretPosition: 1

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['/', '/', /\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '//3333',
      rawValue: '2',
      currentCaretPosition: 1,

      conformedValue: '//2___',
      adjustedCaretPosition: 3
    },
    {
      line: getLineNumber(),

      mask: [/\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '3333',
      rawValue: '23',
      currentCaretPosition: 1,

      conformedValue: '23__',
      adjustedCaretPosition: 1

      // only: true
    }
  ]
);

//####################################################################################
//####################################################################################
//####################################################################################
//####################################################################################

// export const noGuideMode = _.filter((t) => false, [{
export const noGuideMode = _.filter(
  t => t,
  [
    {
      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '',
      rawValue: '(',
      currentCaretPosition: 1,

      conformedValue: '(',
      adjustedCaretPosition: 1

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '',
      rawValue: '2',
      currentCaretPosition: 1,

      conformedValue: '(2',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '(2',
      rawValue: '(23',
      currentCaretPosition: 3,

      conformedValue: '(23',
      adjustedCaretPosition: 3

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '(2',
      rawValue: '(32',
      currentCaretPosition: 2,

      conformedValue: '(32',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/],
      previousConformedValue: '(234)',
      rawValue: '(234)5',
      currentCaretPosition: 6,

      conformedValue: '(234) 5',
      adjustedCaretPosition: 7

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '(',
      rawValue: '(1',
      currentCaretPosition: 2,

      conformedValue: '(1',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '(23',
      rawValue: '(423',
      currentCaretPosition: 2,

      conformedValue: '(423)',
      adjustedCaretPosition: 2
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/],
      previousConformedValue: '(12',
      rawValue: '(123',
      currentCaretPosition: 4,

      conformedValue: '(123) ',
      adjustedCaretPosition: 6
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/],
      previousConformedValue: '(123) ',
      rawValue: '(123)',
      currentCaretPosition: 5,

      conformedValue: '(123',
      adjustedCaretPosition: 4
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/],
      previousConformedValue: '(987) 6_',
      rawValue: '(9875) 6_',
      currentCaretPosition: 5,

      conformedValue: '(987) 56',
      adjustedCaretPosition: 7

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '(987) 656-4938',
      rawValue: '(987) 6565-4938',
      currentCaretPosition: 10,

      conformedValue: '(987) 656-5493',
      adjustedCaretPosition: 11
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '(',
      rawValue: '',
      currentCaretPosition: 0,

      conformedValue: '',
      adjustedCaretPosition: 0
    },
    {
      line: getLineNumber(),

      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      previousConformedValue: '(1',
      rawValue: '(',
      currentCaretPosition: 1,

      conformedValue: '',
      adjustedCaretPosition: 0

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      previousConformedValue: '',
      rawValue: '_',
      currentCaretPosition: 1,

      conformedValue: '',
      adjustedCaretPosition: 0

      // only: true
    }
  ]
);

//####################################################################################
//####################################################################################
//####################################################################################
//####################################################################################

// export const acceptedCharInMask = _.filter((t) => false, [{
export const acceptedCharInMask = _.filter(
  t => t,
  [
    {
      // export const acceptedCharInMask = _.filter((t) => t.only, [{
      line: getLineNumber(),

      // placeholder 0 _ 0 __
      mask: ['0', ' ', /\d/, ' ', '0', ' ', /\d/, /\d/],
      previousConformedValue: '0 _ 0 __',
      rawValue: '0 3_ 0 __',
      currentCaretPosition: 3,

      conformedValue: '0 3 0 __',
      adjustedCaretPosition: 6

      // only: true
    },
    {
      line: getLineNumber(),

      // placeholder 0 _ 0 __
      mask: ['0', ' ', /\d/, ' ', '0', ' ', /\d/, /\d/],
      previousConformedValue: '0 _ 0 __',
      rawValue: '0 _ 0 __',
      currentCaretPosition: 3,

      conformedValue: '0 _ 0 __',
      adjustedCaretPosition: 3

      // only: true
    },
    {
      line: getLineNumber(),

      // placeholder 0 _ 0 __
      mask: ['0', ' ', /\d/, ' ', '0', ' ', /\d/, /\d/],
      previousConformedValue: '0 3 0 __',
      rawValue: '0  0 __',
      currentCaretPosition: 2,

      conformedValue: '0 _ 0 __',
      adjustedCaretPosition: 0

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['0', ' ', /\d/, ' ', '0', ' ', /\d/, /\d/],
      previousConformedValue: '',
      rawValue: '0',
      currentCaretPosition: 1,

      conformedValue: '0 _ 0 __',
      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['0', '0', ' ', '(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '00 (___)',
      rawValue: '00 (1___)',
      currentCaretPosition: 5,

      conformedValue: '00 (1__)',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      mask: ['0', '0', ' ', '(', /\d/, /\d/, /\d/, ')'],
      previousConformedValue: '',
      rawValue: '00 (234)',
      currentCaretPosition: 8,

      conformedValue: '00 (234)',
      adjustedCaretPosition: 8

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [
        '0',
        '0',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        '0',
        '0',
        ' ',
        '8',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '9',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '00 (34_) 00 83 ___ 93 ___',
      rawValue: '00 (344_) 00 83 ___ 93 ___',
      currentCaretPosition: 6,

      conformedValue: '00 (344) 00 83 ___ 93 ___',
      adjustedCaretPosition: 6

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [
        '0',
        '0',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        '0',
        '0',
        ' ',
        '8',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '9',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '00 (___) 00 83 ___ 93 ___',
      rawValue: '100 (___) 00 83 ___ 93 ___',
      currentCaretPosition: 1,

      conformedValue: '00 (1__) 00 83 ___ 93 ___',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      // placeholder 00 (___) 00 83 ___ 93 ___
      mask: [
        '0',
        '0',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        '0',
        '0',
        ' ',
        '8',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '9',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '',
      rawValue: '0000',
      currentCaretPosition: 4,

      conformedValue: '00 (00_) 00 83 ___ 93 ___',
      adjustedCaretPosition: 6

      // only: true,
    },
    {
      line: getLineNumber(),

      mask: [
        '0',
        '0',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        '0',
        '0',
        ' ',
        '8',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '9',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '00 (344) 00 83 ___ 93 ___',
      rawValue: '00 (34) 00 83 ___ 93 ___',
      currentCaretPosition: 5,

      conformedValue: '00 (34_) 00 83 ___ 93 ___',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [
        '0',
        '0',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        '0',
        '0',
        ' ',
        '8',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '9',
        '3',
        ' ',
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '00 (344) 00 83 ___ 93 ___',
      rawValue: '00 (34) 00 83 ___ 93 ___',
      currentCaretPosition: 5,

      conformedValue: '00 (34_) 00 83 ___ 93 ___',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [
        '+',
        '1',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '',
      rawValue: '1',
      currentCaretPosition: 1,

      conformedValue: '+1 (1__) ___-____',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [
        '+',
        '1',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '+1 (___) ___-____',
      rawValue: '+1 (1___) ___-____',
      currentCaretPosition: 5,

      conformedValue: '+1 (1__) ___-____',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [
        '+',
        '1',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '+1 (2__) ___-____',
      rawValue: '1+1 (2__) ___-____',
      currentCaretPosition: 1,

      conformedValue: '+1 (12_) ___-____',
      adjustedCaretPosition: 5

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [
        '+',
        '1',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '+1 (2__) ___-____',
      rawValue: '+11 (2__) ___-____',
      currentCaretPosition: 2,

      conformedValue: '+1 (12_) ___-____',
      adjustedCaretPosition: 4

      // only: true
    },
    {
      line: getLineNumber(),

      // placeholder +1 (___) ___-____
      mask: [
        '+',
        '1',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '+1 (1__) ___-____',
      rawValue: '1 (1__) ___-____',
      currentCaretPosition: 0,

      conformedValue: '+1 (1__) ___-____',
      adjustedCaretPosition: 0

      // only: true
    }
  ]
);

//####################################################################################
//####################################################################################
//####################################################################################
//####################################################################################

// export const escapedMaskChar = _.filter((t) => false, [{
export const escapedMaskChar = _.filter(
  t => t,
  [
    {
      mask: [
        '+',
        '1',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '',
      rawValue: '9',
      currentCaretPosition: 1,
      //
      conformedValue: '+1 (9__) ___-____',
      adjustedCaretPosition: 6
    },
    {
      mask: [
        '+',
        '1',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ],
      previousConformedValue: '',
      rawValue: '+1 (__) ___-____',
      currentCaretPosition: 4,

      conformedValue: '+1 (___) ___-____',
      adjustedCaretPosition: 4

      // only: true
    }
  ]
);

//####################################################################################
//####################################################################################
//####################################################################################
//####################################################################################

export const caretTrapTests = _.filter(
  t => t,
  [
    {
      // export const escapedMaskChar = _.filter((t) => false, [{
      // export const escapedMaskChar = _.filter((t) => t.only, [{
      line: getLineNumber(),

      mask: ['$', /\d/, ',', /\d/, /\d/, /\d/, /\d/, '.'],
      previousConformedValue: '$2,000.2',
      rawValue: '$2,000.',
      currentCaretPosition: 7,
      conformedValue: '$2,000.',
      caretTrapIndexes: [7],

      adjustedCaretPosition: 7
    }
  ]
);

export function transformTestForComponent(test) {
  const {
    input: { mask },
    output: { conformedValue, adjustedCaretPosition }
  } = test;

  return {
    conformedValue:
      conformedValue === convertMaskToPlaceholder(mask) && adjustedCaretPosition === 0
        ? ''
        : conformedValue
  };
}
