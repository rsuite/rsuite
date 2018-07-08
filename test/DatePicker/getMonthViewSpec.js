import moment from 'moment';
import getMonthView from '../../src/utils/getMonthView';

describe('getMonthView', () => {
  it('Sunday is the first day of the week.', () => {
    const weeks = getMonthView(moment('2017-11-30'));
    assert.equal(weeks[0].format('YYYY-MM-DD'), '2017-11-26');
  });

  it('Monday is the first day of the week.', () => {
    const weeks = getMonthView(moment('2017-11-30'), true);
    assert.equal(weeks[0].format('YYYY-MM-DD'), '2017-11-27');
  });
});
