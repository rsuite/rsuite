import React from 'react';
import CalendarBody from '../CalendarBody';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Calendar-Body', () => {
  testStandardProps(<CalendarBody />);

  it('Should render a div with "body" class', () => {
    render(<CalendarBody data-testid="body" />);
    expect(screen.getByTestId('body')).to.have.class('rs-calendar-body');
  });
});
