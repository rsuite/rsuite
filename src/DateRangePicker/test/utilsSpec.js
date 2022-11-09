import { getSafeCalendarDate } from '../utils';
import { isSameMonth, getMonth, format } from '../../utils/dateUtils';

describe('DateRangePicker - utils - getSafeCalendarDate', () => {
  it('Should not be a date range of the same month', () => {
    const value = [new Date(), new Date()];
    const rangeDate = getSafeCalendarDate({ value });

    expect(isSameMonth(value[0], value[1])).to.be.true;
    expect(isSameMonth(rangeDate[0], rangeDate[1])).to.be.false;
  });

  it('Should end date plus one month', () => {
    const value = [new Date(), new Date()];
    const rangeDate = getSafeCalendarDate({ value, calendarKey: 'start' });

    expect(getMonth(value[0])).to.be.equal(getMonth(rangeDate[0]));
    expect(getMonth(value[1])).to.not.be.equal(getMonth(rangeDate[1]));
    expect(getMonth(rangeDate[1]) - getMonth(rangeDate[0])).to.be.equal(1);
  });

  it('Should start date minus one month', () => {
    const value = [new Date(), new Date()];
    const rangeDate = getSafeCalendarDate({ value, calendarKey: 'end' });

    expect(getMonth(value[0])).to.not.be.equal(getMonth(rangeDate[0]));
    expect(getMonth(value[1])).to.be.equal(getMonth(rangeDate[1]));
    expect(getMonth(rangeDate[1]) - getMonth(rangeDate[0])).to.be.equal(1);
  });

  it('Should be create end date from start date', () => {
    const value = [new Date()];
    const rangeDate = getSafeCalendarDate({ value });

    expect(rangeDate[0]).to.instanceOf(Date);
    expect(rangeDate[1]).to.instanceOf(Date);
    expect(getMonth(rangeDate[1]) - getMonth(rangeDate[0])).to.be.equal(1);
  });

  it('Should create start and end dates by default', () => {
    const value = [];
    const rangeDate = getSafeCalendarDate({ value });

    expect(rangeDate[0]).to.instanceOf(Date);
    expect(rangeDate[1]).to.instanceOf(Date);
    expect(getMonth(rangeDate[1]) - getMonth(rangeDate[0])).to.be.equal(1);
  });

  it('Should change end month but not time', () => {
    const value = [new Date('2022-04-01 00:00:00'), new Date('2022-03-01 23:59:59')];
    const rangeDate = getSafeCalendarDate({ value, calendarKey: 'start' });

    expect(format(rangeDate[0], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-04-01 00:00:00');
    expect(format(rangeDate[1], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-05-01 23:59:59');
  });

  it('Should change start month but not time', () => {
    const value = [new Date('2022-04-01 00:00:00'), new Date('2022-03-01 23:59:59')];
    const rangeDate = getSafeCalendarDate({ value, calendarKey: 'end' });

    expect(format(rangeDate[0], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-02-01 00:00:00');
    expect(format(rangeDate[1], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-03-01 23:59:59');
  });
});
