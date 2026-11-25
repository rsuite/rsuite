import React from 'react';
import Steps from '../Steps';
import StepItem from '../StepItem';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.scss';

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
