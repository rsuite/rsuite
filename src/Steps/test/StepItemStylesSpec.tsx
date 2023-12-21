import React from 'react';
import { render, screen } from '@testing-library/react';
import StepItem from '../StepItem';

import '../styles/index.less';

describe('StepItem styles', () => {
  it('Should render the correct styles', () => {
    render(<StepItem data-testid="step_item" />);
    expect(screen.getByTestId('step_item')).to.have.style('padding-left', '40px');
  });
});
