import React from 'react';
import Sidebar from '../Sidebar';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/utils';
import { render } from '@testing-library/react';

describe('Sidebar', () => {
  testStandardProps(<Sidebar />);

  it('Should render a Sidebar', () => {
    const title = 'Test';
    const { container } = render(<Sidebar>{title}</Sidebar>);
    expect(container.firstChild).to.have.class('rs-sidebar');
    expect(container.firstChild).to.have.text(title);
  });
});
