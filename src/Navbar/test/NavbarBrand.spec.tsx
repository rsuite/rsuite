import React from 'react';
import NavbarBrand from '../NavbarBrand';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('NavbarBrand', () => {
  testStandardProps(<NavbarBrand />);

  it('Should render an <a> element with given href attribute', () => {
    render(
      <NavbarBrand href="/" data-testid="link">
        RSUITE
      </NavbarBrand>
    );

    expect(screen.getByTestId('link')).to.have.tagName('A');
    expect(screen.getByTestId('link')).to.have.attr('href', '/');
    expect(screen.getByTestId('link')).to.have.text('RSUITE');
  });
});
