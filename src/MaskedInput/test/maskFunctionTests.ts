import _ from 'lodash/fp';
import { getLineNumber } from './testParameters';

// export default _.filter((t) => false, [{
export default _.filter(
  t => t,
  [
    {
      previousConformedValue: '$100',
      rawValue: '$1000',
      mask: ['$', /\d/, ',', /\d/, /\d/, /\d/],
      currentCaretPosition: 5,
      conformedValue: '$1,000',

      adjustedCaretPosition: 6
    },
    {
      line: getLineNumber(),

      previousConformedValue: '2 $',
      rawValue: '24 $',
      mask: [/\d/, /\d/, ' ', '$'],
      currentCaretPosition: 2,
      conformedValue: '24 $',

      adjustedCaretPosition: 2

      // only: true,
    },
    {
      line: getLineNumber(),

      mask: [/./, /./, /./, '@', /./, /./, /./, /./],
      previousConformedValue: 'asdf@asdf',
      rawValue: 'asf@asdf',
      currentCaretPosition: 2,
      conformedValue: 'asf@asdf',

      adjustedCaretPosition: 2

      // only: true
    },
    {
      line: getLineNumber(),

      mask: [/./, /./, /./, '@', ' ', '.', /[^.]/, /[^.]/, /[^.]/],
      previousConformedValue: 'asd@asdf.com',
      rawValue: 'asd@.com',
      currentCaretPosition: 4,
      conformedValue: 'asd@ .com',

      adjustedCaretPosition: 4,

      // only: true,

      skips: ['adjustCaretPosition']
    }
  ]
);
