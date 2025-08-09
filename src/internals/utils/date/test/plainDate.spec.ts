import { describe, test, expect } from 'vitest';
import { addDays } from '../plainDate';

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
