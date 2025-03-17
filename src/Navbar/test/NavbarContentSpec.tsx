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

    expect(content).to.have.attr('data-visible-from', 'xs');
    expect(content).to.have.attr('data-hidden-from', 'md');
  });
});
