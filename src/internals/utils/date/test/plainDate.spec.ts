import { describe, test, expect, vi } from 'vitest';
import { isSameDay, addDays, isEveryDayInMonth } from '../plainDate';

describe('isSameDay', () => {
  test('should return true if year, month, day all match', () => {
    const plainDate = { year: 2025, month: 8, day: 24 };
    const jsDate = new Date(2025, 7, 24);

    expect(isSameDay(plainDate, jsDate)).toBe(true);
  });

  test('should return false if jsDate is an invalid date', () => {
    const date = { year: 2025, month: 8, day: 24 };
    const invalidDate = new Date('invalid-date');

    expect(isSameDay(date, invalidDate)).toBe(false);
  });
});

describe('addDays', () => {
  test('should add days to a PlainDate', () => {
    const date = { year: 2025, month: 8, day: 9 };

    expect(addDays(date, 1)).toEqual({ year: 2025, month: 8, day: 10 });
    // Cross-month
    expect(addDays(date, 31)).toEqual({ year: 2025, month: 9, day: 9 });
    // Cross-year
    expect(addDays(date, 365)).toEqual({ year: 2026, month: 8, day: 9 });
  });
});

describe('isEveryDayInMonth', () => {
  test.each([
    [2023, 2, 28],
    [2024, 2, 29],
    [2024, 4, 30],
    [2024, 6, 30],
    [2024, 7, 31]
  ])('should check every day in %i-%i', (year, month, daysInMonth) => {
    const predicate = vi.fn(() => true);

    expect(isEveryDayInMonth({ year, month }, predicate)).toBe(true);
    expect(predicate).toHaveBeenCalledTimes(daysInMonth);
    expect(predicate).toHaveBeenLastCalledWith({ year, month, day: daysInMonth });
  });
});
