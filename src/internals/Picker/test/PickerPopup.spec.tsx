import React from 'react';
import PickerPopup from '../PickerPopup';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('PickerPopup', () => {
  testStandardProps(<PickerPopup />);
  it('Should render a popup', () => {
    render(<PickerPopup data-testid="overlay" />);
    expect(screen.getByTestId('overlay').className).to.contain('picker-popup');
  });

  it('Should render a popup with correct class', () => {
    render(
      <PickerPopup data-testid="picker-popup">
        <div>test</div>
      </PickerPopup>
    );

    const popup = screen.getByTestId('picker-popup');
    expect(popup.className).to.contain('picker-popup');
  });

  it('Should render children correctly', () => {
    render(
      <PickerPopup data-testid="picker-popup">
        <div data-testid="test-content">test content</div>
      </PickerPopup>
    );

    expect(screen.getByTestId('test-content')).to.exist;
    expect(screen.getByTestId('test-content').textContent).to.equal('test content');
  });

  it('Should apply custom styles', () => {
    render(
      <PickerPopup data-testid="picker-popup" style={{ backgroundColor: 'red' }}>
        <div>test</div>
      </PickerPopup>
    );

    const popup = screen.getByTestId('picker-popup');
    expect(popup.style.backgroundColor).to.equal('red');
  });
});
