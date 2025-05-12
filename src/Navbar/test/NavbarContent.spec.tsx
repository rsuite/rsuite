import React from 'react';
import NavbarContent from '../NavbarContent';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('NavbarContent', () => {
  testStandardProps(<NavbarContent />);

  it('Should render responsive classes', () => {
    render(
      <NavbarContent showFrom="xs" hideFrom="md" data-testid="content">
        Navbar Content
      </NavbarContent>
    );

    const content = screen.getByTestId('content');

    expect(content).to.have.attr('data-visible-from', 'xs');
    expect(content).to.have.attr('data-hidden-from', 'md');
  });
});
