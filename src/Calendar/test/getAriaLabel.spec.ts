import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGetAriaLabelForMonth } from '../utils/getAriaLabel';

describe('useGetAriaLabelForMonth', () => {
  it('returns a function that formats the month according to the locale', () => {
    const { result } = renderHook(() => useGetAriaLabelForMonth());

    expect(result.current({ year: 2025, month: 9 })).toBe('Sep 2025');
  });
});
