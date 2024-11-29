import React from 'react';
import { testStandardProps } from '@test/utils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StatLabel from '../StatLabel';

describe('StatLabel', () => {
  testStandardProps(<StatLabel />);

  it('Should uppercase the label', () => {
    render(<StatLabel uppercase>Test</StatLabel>);

    expect(screen.getByText('Test')).to.have.class('rs-stat-label-uppercase');
  });

  it('Should render info', async () => {
    render(<StatLabel info="info">Test</StatLabel>);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).to.exist;
    });
  });
});
