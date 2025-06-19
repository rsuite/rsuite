import React from 'react';
import List from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.scss';

describe('List styles', () => {
  it('Should render correct toggle styles', () => {
    render(<List data-testid="list" />);

    expect(screen.getByTestId('list')).to.have.style('position', 'relative');
  });
});
