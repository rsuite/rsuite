import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import StepItem from '../StepItem';
import AddOutline from '@rsuite/icons/AddOutline';

describe('StepItem', () => {
  testStandardProps(<StepItem />);

  it('Should render a StepItem', () => {
    render(<StepItem data-testid="step_item" />);
    expect(screen.getByTestId('step_item')).to.have.class('rs-steps-item');
  });

  it('Should render a content dom', () => {
    render(<StepItem data-testid="step_item" />);
    expect(
      screen.getByTestId('step_item').querySelectorAll('.rs-steps-item-content')
    ).to.have.length(1);
  });

  it('Should have a status', () => {
    render(<StepItem data-testid="step_item" status="process" />);
    expect(screen.getByTestId('step_item')).to.have.class('rs-steps-item-status-process');
  });

  it('Should render custom icon', () => {
    const { container } = render(<StepItem icon={<AddOutline data-testid="custom-icon" />} />);

    expect(container.firstChild).to.have.class('rs-steps-item-custom');
    expect(screen.getByTestId('custom-icon')).to.exist;
  });

  it('Should output a number', () => {
    render(<StepItem stepNumber={10} />);
    expect(screen.getByText('10')).to.exist;
  });

  (['wait', 'process'] as const).forEach(status => {
    it(`Should render stepNumber when status is "${status}"`, () => {
      render(<StepItem stepNumber={2} status={status} data-testid="item" />);

      expect(screen.getByTestId('item')).to.have.text('2');
    });
  });

  it('Should render description', () => {
    render(<StepItem description="test" />);
    expect(screen.getByText('test')).to.have.class('rs-steps-item-description');
  });

  it('Should render title', () => {
    render(<StepItem title="test" />);
    expect(screen.getByText('test')).to.have.class('rs-steps-item-title');
  });
});
