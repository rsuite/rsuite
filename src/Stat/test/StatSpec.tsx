import React from 'react';
import { testStandardProps } from '@test/utils';
import { render } from '@testing-library/react';
import Stat from '../Stat';

describe('Stat', () => {
  testStandardProps(<Stat />);

  it('Should hava a border', () => {
    const { container } = render(<Stat bordered />);
    expect(container.firstChild).to.have.class('rs-stat-bordered');
  });
});
