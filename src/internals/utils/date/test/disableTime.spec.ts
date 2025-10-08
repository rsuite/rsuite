import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsDateTimeDisabled } from '../disableTime';

describe('useIsDateTimeDisabled', () => {
  it('return a function', () => {
    const { result } = renderHook(() => useIsDateTimeDisabled({}));

    expect(result.current).toBeTypeOf('function');
  });

  it('returns true when the hour is hidden', () => {
    const hideHours = vi.fn(hour => hour === 23);

    const { result } = renderHook(() => useIsDateTimeDisabled({ hideHours }));

    const isTimeDisabled = result.current({
      year: 2025,
      month: 10,
      day: 10,
      hour: 23,
      minute: 54,
      second: 30
    });

    expect(hideHours).toHaveBeenCalledWith(23, { year: 2025, month: 10, day: 10 });
    expect(isTimeDisabled).toBe(true);
  });

  it('returns true when the hour is disabled', () => {
    const disabledHours = vi.fn(hour => hour === 23);

    const { result } = renderHook(() => useIsDateTimeDisabled({ disabledHours }));

    const isTimeDisabled = result.current({
      year: 2025,
      month: 10,
      day: 10,
      hour: 23,
      minute: 54,
      second: 30
    });

    expect(disabledHours).toHaveBeenCalledWith(23, { year: 2025, month: 10, day: 10 });
    expect(isTimeDisabled).toBe(true);
  });

  it('returns true when the minute is hidden', () => {
    const hideMinutes = vi.fn(minute => minute === 54);

    const { result } = renderHook(() => useIsDateTimeDisabled({ hideMinutes }));

    const isTimeDisabled = result.current({
      year: 2025,
      month: 10,
      day: 10,
      hour: 23,
      minute: 54,
      second: 30
    });

    expect(hideMinutes).toHaveBeenCalledWith(54, { year: 2025, month: 10, day: 10 });
    expect(isTimeDisabled).toBe(true);
  });

  it('returns true when the minute is disabled', () => {
    const disabledMinutes = vi.fn(minute => minute === 54);

    const { result } = renderHook(() => useIsDateTimeDisabled({ disabledMinutes }));

    const isTimeDisabled = result.current({
      year: 2025,
      month: 10,
      day: 10,
      hour: 23,
      minute: 54,
      second: 30
    });

    expect(disabledMinutes).toHaveBeenCalledWith(54, { year: 2025, month: 10, day: 10 });
    expect(isTimeDisabled).toBe(true);
  });

  it('returns true when the second is hidden', () => {
    const hideSeconds = vi.fn(second => second === 30);

    const { result } = renderHook(() => useIsDateTimeDisabled({ hideSeconds }));

    const isTimeDisabled = result.current({
      year: 2025,
      month: 10,
      day: 10,
      hour: 23,
      minute: 54,
      second: 30
    });

    expect(hideSeconds).toHaveBeenCalledWith(30, { year: 2025, month: 10, day: 10 });
    expect(isTimeDisabled).toBe(true);
  });

  it('returns true when the second is disabled', () => {
    const disabledSeconds = vi.fn(second => second === 30);

    const { result } = renderHook(() => useIsDateTimeDisabled({ disabledSeconds }));

    const isTimeDisabled = result.current({
      year: 2025,
      month: 10,
      day: 10,
      hour: 23,
      minute: 54,
      second: 30
    });

    expect(disabledSeconds).toHaveBeenCalledWith(30, { year: 2025, month: 10, day: 10 });
    expect(isTimeDisabled).toBe(true);
  });

  it('returns false when the time is not disabled or hidden', () => {
    const hideHours = vi.fn(() => false);
    const disabledMinutes = vi.fn(() => false);

    const { result } = renderHook(() => useIsDateTimeDisabled({ hideHours, disabledMinutes }));

    const isTimeDisabled = result.current({
      year: 2025,
      month: 10,
      day: 10,
      hour: 23,
      minute: 54,
      second: 30
    });

    expect(isTimeDisabled).toBe(false);
  });
});
