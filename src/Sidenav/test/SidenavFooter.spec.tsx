import React from 'react';
import SidenavFooter from '../SidenavFooter';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render } from '@testing-library/react';

describe('SidenavFooter', () => {
  testStandardProps(<SidenavFooter />);

  it('Should render a footer', () => {
    const { container } = render(<SidenavFooter>footer</SidenavFooter>);
    expect(container.firstChild).to.have.class('rs-sidenav-footer');
    expect(container.firstChild).to.have.text('footer');
  });
});
