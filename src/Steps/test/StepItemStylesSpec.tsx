import React from 'react';
import Steps from '../Steps';
import StepItem from '../StepItem';
import { render, screen } from '@testing-library/react';
import '../styles/index.less';

describe('StepItem styles', () => {
  it('Should render the correct styles', () => {
    render(
      <Steps>
        <StepItem data-testid="step_item" />
      </Steps>
    );

    expect(screen.getByTestId('step_item')).to.have.style('padding-inline-start', '40px');
  });
});
