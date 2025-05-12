import React from 'react';
import Drawer from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Drawer.Footer', () => {
  testStandardProps(<Drawer.Footer />);
  it('Should render a drawer footer', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Footer>{title}</Drawer.Footer>);
    expect(container.firstChild).to.have.class('rs-drawer-footer');
    expect(container.firstChild).to.have.text(title);
  });
});
