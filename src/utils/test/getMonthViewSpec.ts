import { parseISO, format, getMonthView } from '../dateUtils';

describe('[utils] getMonthView', () => {
  it('Sunday is the first day of the week.', () => {
    const weeks = getMonthView(parseISO('2017-11-30'), false);
    assert.equal(format(weeks[0], 'yyyy-MM-dd'), '2017-11-26');
  });

  it('Monday is the first day of the week.', () => {
    const weeks = getMonthView(parseISO('2017-11-30'), true);
    assert.equal(format(weeks[0], 'yyyy-MM-dd'), '2017-11-27');
  });
});
