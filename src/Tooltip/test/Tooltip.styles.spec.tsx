import React from 'react';
import Tooltip from '../Tooltip';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('Tooltip styles', () => {
  it('Should render the correct styles', () => {
    render(<Tooltip visible>Text</Tooltip>);

    expect(screen.getByRole('tooltip')).to.have.style('font-size', '12px');
    expect(screen.getByRole('tooltip')).to.have.style('background-color', toRGB('#121212'));
    expect(screen.getByRole('tooltip')).to.have.style('padding', '4px 10px');
  });
});
