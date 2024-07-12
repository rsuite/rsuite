import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from '../Tooltip';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('Tooltip styles', () => {
  it('Should render the correct styles', () => {
    render(<Tooltip visible>Text</Tooltip>);

    expect(screen.getByRole('tooltip')).to.have.style('font-size', '12px');
    expect(screen.getByRole('tooltip')).to.have.style('background-color', toRGB('#121212'));
    expect(screen.getByRole('tooltip')).to.have.style('padding', '2px 10px');
  });
});
