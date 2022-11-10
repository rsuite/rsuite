import { copyTime, reverseDateRangeOmitTime, format, getReversedTimeMeridian } from '../dateUtils';

describe('[utils] dateUtils', () => {
  describe('copyTime', () => {
    it('Should copy the time to the specified date', () => {
      const date = new Date('2022-01-01 12:00:00');
      const time = new Date('2022-12-10 18:59:59');

      expect(format(copyTime({ from: time, to: date }), 'yyyy-MM-dd HH:mm:ss')).to.equal(
        '2022-01-01 18:59:59'
      );
    });

    it('Should not change the original date and time', () => {
      const date = new Date('2022-01-01 12:00:00');
      const time = new Date('2022-12-10 18:59:59');
      const newDate = copyTime({ from: time, to: date });

      expect(format(newDate, 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-01-01 18:59:59');
      expect(format(date, 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-01-01 12:00:00');
      expect(format(time, 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-12-10 18:59:59');
    });
  });

  describe('reverseDateRangeOmitTime', () => {
    it('Should swap two dates but not the time', () => {
      const dateRange = [new Date('2022-01-01 12:00:00'), new Date('2022-12-10 18:59:59')];
      const newDateRange = reverseDateRangeOmitTime(dateRange);

      expect(format(newDateRange[0], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-12-10 12:00:00');
      expect(format(newDateRange[1], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-01-01 18:59:59');
    });

    it('Should not change the original date range', () => {
      const dateRange = [new Date('2022-01-01 12:00:00'), new Date('2022-12-10 18:59:59')];

      reverseDateRangeOmitTime(dateRange);

      expect(format(dateRange[0], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-01-01 12:00:00');
      expect(format(dateRange[1], 'yyyy-MM-dd HH:mm:ss')).to.equal('2022-12-10 18:59:59');
    });
  });

  describe('getReversedTimeMeridian', () => {
    it('Should return the correct time', () => {
      expect(
        format(getReversedTimeMeridian(new Date('2022-01-01 12:00:00')), 'yyyy-MM-dd HH:mm:ss')
      ).to.equal('2022-01-01 00:00:00');

      expect(
        format(getReversedTimeMeridian(new Date('2022-01-01 14:00:00')), 'yyyy-MM-dd HH:mm:ss')
      ).to.equal('2022-01-01 02:00:00');

      expect(
        format(getReversedTimeMeridian(new Date('2022-01-01 05:00:00')), 'yyyy-MM-dd HH:mm:ss')
      ).to.equal('2022-01-01 17:00:00');
    });
  });
});
