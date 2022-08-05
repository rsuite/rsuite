import { renderHook } from '@testing-library/react-hooks/dom';
import useCalendarDate from '../useCalendarDate';
import format from 'date-fns/format';

describe('useCalendarDate', () => {
  it('Should return controlled date', () => {
    const { result } = renderHook(() =>
      useCalendarDate(new Date('07/01/2021'), new Date('08/01/2021'))
    );

    expect(format(result.current.calendarDate, 'yyyy-MM-dd')).to.equal('2021-07-01');
  });

  it('Should return default date', () => {
    const { result } = renderHook(() => useCalendarDate(undefined, new Date('08/01/2021')));

    expect(format(result.current.calendarDate, 'yyyy-MM-dd')).to.equal('2021-08-01');
  });

  it('Should update calendarDate when value is updated', () => {
    const { result, rerender } = renderHook(({ initialValue }) => useCalendarDate(initialValue), {
      initialProps: { initialValue: new Date('07/01/2021') }
    });
    expect(format(result.current.calendarDate, 'yyyy-MM-dd')).to.equal('2021-07-01');

    rerender({ initialValue: new Date('09/01/2021') });

    expect(format(result.current.calendarDate, 'yyyy-MM-dd')).to.equal('2021-09-01');
  });

  it('Should update calendarDate by `setCalendarDate`', () => {
    const { result } = renderHook(() => useCalendarDate(new Date('07/01/2021')));

    expect(format(result.current.calendarDate, 'yyyy-MM-dd')).to.equal('2021-07-01');

    result.current.setCalendarDate(new Date('09/01/2021'));

    expect(format(result.current.calendarDate, 'yyyy-MM-dd')).to.equal('2021-09-01');
  });

  it('Should reset the datetime', () => {
    const { result } = renderHook(() =>
      useCalendarDate(undefined, new Date('08/04/2022 00:00:10'))
    );

    result.current.setCalendarDate(new Date('09/01/2021'));

    expect(format(result.current.calendarDate, 'yyyy-MM-dd')).to.equal('2021-09-01');

    result.current.resetCalendarDate();

    expect(format(result.current.calendarDate, 'yyyy-MM-dd HH:mm:ss')).to.equal(
      '2022-08-04 00:00:10'
    );
  });
});
