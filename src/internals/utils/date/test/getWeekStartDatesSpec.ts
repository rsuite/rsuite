import { parseISO, format } from 'date-fns';
import getWeekStartDates from '../getWeekStartDates';

describe('internals/utils/date/getWeekStartDates', () => {
  it('Sunday is the first day of the week.', () => {
    const weeks = getWeekStartDates(parseISO('2017-11-30'), { isoWeek: false });
    assert.equal(format(weeks[0], 'yyyy-MM-dd'), '2017-11-26');
  });

  it('Monday is the first day of the week.', () => {
    const weeks = getWeekStartDates(parseISO('2017-11-30'), { isoWeek: true });
    assert.equal(format(weeks[0], 'yyyy-MM-dd'), '2017-11-27');
  });
});
