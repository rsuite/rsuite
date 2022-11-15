import React from 'react';
import { render } from '@testing-library/react';
import PickerOverlay from '../PickerOverlay';

describe('PickerOverlay', () => {
  it('Should render a menu', () => {
    const { getByTestId } = render(<PickerOverlay data-testid="overlay" />);
    expect(getByTestId('overlay').className).to.contain('picker-menu');
  });

  it('Should have a custom className', () => {
    const { getByTestId } = render(<PickerOverlay data-testid="overlay" className="custom" />);
    expect(getByTestId('overlay').className).to.contain('custom');
  });

  it('Should have a custom style', () => {
    const { getByTestId } = render(
      <PickerOverlay data-testid="overlay" style={{ fontSize: 12 }} />
    );

    expect(getByTestId('overlay').style.fontSize).to.equal('12px');
  });

  it('Should have a custom className prefix', () => {
    const { getByTestId } = render(
      <PickerOverlay data-testid="overlay" classPrefix="custom-prefix" />
    );
    expect(getByTestId('overlay').className).to.contain('custom-prefix');
  });
});
