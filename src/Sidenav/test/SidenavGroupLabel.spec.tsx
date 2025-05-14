import React from 'react';
import SidenavGroupLabel from '../SidenavGroupLabel';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render } from '@testing-library/react';

describe('SidenavGroupLabel', () => {
  testStandardProps(<SidenavGroupLabel />);

  it('Should render a group label', () => {
    const { container } = render(<SidenavGroupLabel>group</SidenavGroupLabel>);
    expect(container.firstChild).to.have.class('rs-sidenav-group-label');
    expect(container.firstChild).to.have.text('group');
  });
});
