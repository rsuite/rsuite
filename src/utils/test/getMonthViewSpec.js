import getMonthView from '../getMonthView';
import { parse, format } from 'date-fns';

describe('[utils] getMonthView', () => {
  it('Sunday is the first day of the week.', () => {
    const weeks = getMonthView(parse('2017-11-30'));
    assert.equal(format(weeks[0], 'YYYY-MM-DD'), '2017-11-26');
  });

  it('Monday is the first day of the week.', () => {
    const weeks = getMonthView(parse('2017-11-30'), true);
    assert.equal(format(weeks[0], 'YYYY-MM-DD'), '2017-11-27');
  });
});
