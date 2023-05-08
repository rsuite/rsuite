import React from 'react';
import { render, screen } from '@testing-library/react';
import PickerOverlay from '../PickerOverlay';

describe('PickerOverlay', () => {
  it('Should render a menu', () => {
    render(<PickerOverlay data-testid="overlay" />);
    expect(screen.getByTestId('overlay').className).to.contain('picker-menu');
  });

  it('Should have a custom className', () => {
    render(<PickerOverlay data-testid="overlay" className="custom" />);
    expect(screen.getByTestId('overlay').className).to.contain('custom');
  });

  it('Should have a custom style', () => {
    render(<PickerOverlay data-testid="overlay" style={{ fontSize: 12 }} />);

    expect(screen.getByTestId('overlay').style.fontSize).to.equal('12px');
  });

  it('Should have a custom className prefix', () => {
    render(<PickerOverlay data-testid="overlay" classPrefix="custom-prefix" />);
    expect(screen.getByTestId('overlay').className).to.contain('custom-prefix');
  });
});
