import { format } from 'date-fns';
import reverseDateRangeOmitTime from '../reverseDateRangeOmitTime';

describe('internals/utils/date/reverseDateRangeOmitTime', () => {
  it('Should swap two dates but not the time', () => {
    const dateRange: [Date, Date] = [
      new Date('2022-01-01 12:00:00'),
      new Date('2022-12-10 18:59:59')
    ];
    const newDateRange = reverseDateRangeOmitTime(dateRange);

    expect(format(newDateRange[0], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-12-10 12:00:00');
    expect(format(newDateRange[1], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-01-01 18:59:59');
  });

  it('Should not change the original date range', () => {
    const dateRange: [Date, Date] = [
      new Date('2022-01-01 12:00:00'),
      new Date('2022-12-10 18:59:59')
    ];

    reverseDateRangeOmitTime(dateRange);

    expect(format(dateRange[0], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-01-01 12:00:00');
    expect(format(dateRange[1], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-12-10 18:59:59');
  });
});
