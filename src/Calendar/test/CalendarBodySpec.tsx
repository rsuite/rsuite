import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

import CalendarBody from '../CalendarBody';

describe('Calendar-Body', () => {
  testStandardProps(<CalendarBody />);

  it('Should render a div with "body" class', () => {
    render(<CalendarBody data-testid="body" />);
    expect(screen.getByTestId('body')).to.have.class('rs-calendar-body');
  });
});
