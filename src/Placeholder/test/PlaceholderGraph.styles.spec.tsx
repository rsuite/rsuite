import React from 'react';
import PlaceholderGraph from '../PlaceholderGraph';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('Placeholder.Graph styles', () => {
  it('Should render the correct styles', () => {
    render(<PlaceholderGraph data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.style('display', 'inline-block');
    expect(screen.getByTestId('p')).to.have.style('background-color', toRGB('#f2f2f5'));
  });
});
