import React from 'react';
import Table from '../Table';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';

describe('Calendar-Table', () => {
  testStandardProps(<Table rows={[]} />);

  it('Should render a div with `table` class', () => {
    const { container } = render(<Table rows={[]} />);

    expect(container.firstChild).to.match('div.rs-calendar-table');
  });
});
