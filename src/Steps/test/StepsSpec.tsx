import React from 'react';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';
import Steps from '../Steps';

describe('Steps', () => {
  testStandardProps(<Steps />);

  it('Should render a Steps', () => {
    render(<Steps data-testid="steps" />);
    expect(screen.getByTestId('steps')).to.have.class('rs-steps');
    expect(screen.getByTestId('steps')).to.have.class('rs-steps-horizontal');
  });

  it('Should be displayed vertically', () => {
    render(<Steps data-testid="steps" vertical />);
    expect(screen.getByTestId('steps')).to.have.class('rs-steps-vertical');
  });

  it('Should activate the current step', () => {
    render(
      <Steps current={2}>
        <Steps.Item title="A" />
        <Steps.Item title="B" />
        <Steps.Item title="C" />
        <Steps.Item title="D" />
      </Steps>
    );

    expect(screen.getByText('C').closest('.rs-steps-item')).to.have.class('rs-steps-item-active');
  });

  it('Should activate the current error step ', () => {
    render(
      <Steps current={1} currentStatus="error">
        <Steps.Item title="A" />
        <Steps.Item title="B" />
        <Steps.Item title="C" />
        <Steps.Item title="D" />
      </Steps>
    );

    expect(screen.getByText('B').closest('.rs-steps-item')).to.have.class(
      'rs-steps-item-status-error'
    );
  });

  it('Should be small', () => {
    render(<Steps data-testid="steps" small />);
    expect(screen.getByTestId('steps')).to.have.class('rs-steps-small');
  });
});
