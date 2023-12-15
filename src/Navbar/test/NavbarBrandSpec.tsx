import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import NavbarBrand from '../NavbarBrand';

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
