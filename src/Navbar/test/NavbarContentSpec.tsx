import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import NavbarContent from '../NavbarContent';

describe('NavbarContent', () => {
  testStandardProps(<NavbarContent />);

  it('Should render responsive classes', () => {
    render(
      <NavbarContent visible="xs" hidden="md" data-testid="content">
        Navbar Content
      </NavbarContent>
    );

    const content = screen.getByTestId('content');

    expect(content).to.have.class('rs-box-visible-xs');
    expect(content).to.have.class('rs-box-hidden-md');
  });
});
