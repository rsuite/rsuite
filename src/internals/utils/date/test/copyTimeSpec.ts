import { format } from 'date-fns/format';
import copyTime from '../copyTime';

describe('internals/utils/date/copyTime', () => {
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
