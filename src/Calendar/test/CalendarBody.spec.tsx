import React from 'react';
import CalendarBody from '../CalendarBody';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Calendar-Body', () => {
  testStandardProps(<CalendarBody yearMonth={{ year: 2025, month: 9 }} />);

  it('Should render a div with "body" class', () => {
    render(<CalendarBody yearMonth={{ year: 2025, month: 9 }} data-testid="body" />);
    expect(screen.getByTestId('body')).to.have.class('rs-calendar-body');
  });
});
