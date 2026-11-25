import React from 'react';
import Steps from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.scss';

describe('Steps styles', () => {
  it('Should render the correct styles', () => {
    render(<Steps data-testid="steps" />);

    expect(screen.getByTestId('steps')).to.have.style('display', 'flex');
  });
});
