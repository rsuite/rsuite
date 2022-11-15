import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';

import CalendarBody from '../CalendarBody';

describe('Calendar-Body', () => {
  testStandardProps(<CalendarBody />);

  it('Should render a div with "body" class', () => {
    const { getByTestId } = render(<CalendarBody data-testid="body" />);
    expect(getByTestId('body')).to.have.class('rs-calendar-body');
  });
});
