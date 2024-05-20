import { format } from 'date-fns';
import getReversedTimeMeridian from '../getReversedTimeMeridian';

describe('internals/utils/date/getReversedTimeMeridian', () => {
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
