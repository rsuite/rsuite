import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from '../Checkbox';
import { toRGB, itChrome } from '@test/utils';

import '../styles/index.less';

describe('Checkbox styles', () => {
  itChrome('Should render the correct border', () => {
    render(<Checkbox />);

    const inner = screen.getByTestId('checkbox-control-inner');
    expect(window.getComputedStyle(inner, '::before').border).to.equal(
      `1px solid ${toRGB('#d9d9d9')}`
    );
  });

  it('Should render the correct size', () => {
    render(<Checkbox />);

    expect(screen.getByRole('checkbox')).to.have.style('width', '36px');
    expect(screen.getByRole('checkbox')).to.have.style('height', '36px');
  });
});
