import { parseISO, format } from 'date-fns';
import getWeekStartDates from '../getWeekStartDates';

describe('internals/utils/date/getWeekStartDates', () => {
  it('Sunday is the first day of the week.', () => {
    const weeks = getWeekStartDates(parseISO('2017-11-30'), { isoWeek: false });
    const dates = [
      '2017-11-26',
      '2017-12-03',
      '2017-12-10',
      '2017-12-17',
      '2017-12-24',
      '2017-12-31'
    ];

    weeks.forEach((week, index) => {
      expect(format(week, 'yyyy-MM-dd')).to.be.equal(dates[index]);
    });
  });

  it('Monday is the first day of the week.', () => {
    const weeks = getWeekStartDates(parseISO('2017-11-30'), { isoWeek: true });
    const dates = [
      '2017-11-27',
      '2017-12-04',
      '2017-12-11',
      '2017-12-18',
      '2017-12-25',
      '2018-01-01'
    ];

    weeks.forEach((week, index) => {
      expect(format(week, 'yyyy-MM-dd')).to.be.equal(dates[index]);
    });
  });

  it('Should be monday as the first day of the week.', () => {
    const weeks = getWeekStartDates(parseISO('2017-11-30'), { weekStart: 1 });
    const dates = [
      '2017-11-27',
      '2017-12-04',
      '2017-12-11',
      '2017-12-18',
      '2017-12-25',
      '2018-01-01'
    ];

    weeks.forEach((week, index) => {
      expect(format(week, 'yyyy-MM-dd')).to.be.equal(dates[index]);
    });
  });

  it('Should be tuesday as the first day of the week.', () => {
    const weeks = getWeekStartDates(parseISO('2017-11-30'), { weekStart: 2 });
    const dates = [
      '2017-11-28',
      '2017-12-05',
      '2017-12-12',
      '2017-12-19',
      '2017-12-26',
      '2018-01-02'
    ];

    weeks.forEach((week, index) => {
      expect(format(week, 'yyyy-MM-dd')).to.be.equal(dates[index]);
    });
  });

  it('Should be saturday as the first day of the week.', () => {
    const weeks = getWeekStartDates(parseISO('2017-11-30'), { weekStart: 6 });
    const dates = [
      '2017-11-25',
      '2017-12-02',
      '2017-12-09',
      '2017-12-16',
      '2017-12-23',
      '2017-12-30'
    ];

    weeks.forEach((week, index) => {
      expect(format(week, 'yyyy-MM-dd')).to.be.equal(dates[index]);
    });
  });
});
