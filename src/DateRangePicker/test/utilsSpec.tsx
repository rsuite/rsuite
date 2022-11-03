import { getCalendarDate } from '../utils';
import { isSameMonth, getMonth } from '../../utils/dateUtils';

describe('DateRangePicker - utils - getCalendarDate', () => {
  it('Should not be a date range of the same month', () => {
    const value = [new Date(), new Date()] as [Date, Date];
    const rangeDate = getCalendarDate({ value });

    expect(isSameMonth(value[0], value[1])).to.be.true;
    expect(isSameMonth(rangeDate[0], rangeDate[1])).to.be.false;
  });

  it('Should end date plus one month', () => {
    const value = [new Date(), new Date()] as [Date, Date];
    const rangeDate = getCalendarDate({ value, calendarKey: 'start' });

    expect(getMonth(value[0])).to.be.equal(getMonth(rangeDate[0]));
    expect(getMonth(value[1])).to.not.be.equal(getMonth(rangeDate[1]));
    expect(getMonth(rangeDate[1]) - getMonth(rangeDate[0])).to.be.equal(1);
  });

  it('Should start date minus one month', () => {
    const value = [new Date(), new Date()] as [Date, Date];
    const rangeDate = getCalendarDate({ value, calendarKey: 'end' });

    expect(getMonth(value[0])).to.not.be.equal(getMonth(rangeDate[0]));
    expect(getMonth(value[1])).to.be.equal(getMonth(rangeDate[1]));
    expect(getMonth(rangeDate[1]) - getMonth(rangeDate[0])).to.be.equal(1);
  });

  it('Should be create end date from start date', () => {
    const value = [new Date()] as Array<Date | undefined> as [Date, Date];
    const rangeDate = getCalendarDate({ value });

    expect(rangeDate[0]).to.instanceOf(Date);
    expect(rangeDate[1]).to.instanceOf(Date);
    expect(getMonth(rangeDate[1]) - getMonth(rangeDate[0])).to.be.equal(1);
  });

  it('Should create start and end dates by default', () => {
    const value = [] as Array<Date | undefined> as [Date, Date];
    const rangeDate = getCalendarDate({ value });

    expect(rangeDate[0]).to.instanceOf(Date);
    expect(rangeDate[1]).to.instanceOf(Date);
    expect(getMonth(rangeDate[1]) - getMonth(rangeDate[0])).to.be.equal(1);
  });
});
