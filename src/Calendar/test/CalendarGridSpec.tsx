import React from 'react';
import Gird from '../Grid';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Calendar-Gird', () => {
  testStandardProps(<Gird rows={[]} />);

  it('Should render a div with `table` class', () => {
    const { container } = render(<Gird rows={[]} />);

    expect(container.firstChild).to.match('div.rs-calendar-table');
  });
});
