import React from 'react';
import { render, screen } from '@testing-library/react';
import Steps from '../index';

import '../styles/index.less';

describe('Steps styles', () => {
  it('Should render the correct styles', () => {
    render(<Steps data-testid="steps" />);

    expect(screen.getByTestId('steps')).to.have.style('display', 'flex');
  });
});
