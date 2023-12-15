import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

import Drawer from '../index';

describe('Drawer.Footer', () => {
  testStandardProps(<Drawer.Footer />);
  it('Should render a drawer footer', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Footer>{title}</Drawer.Footer>);
    expect(container.firstChild).to.have.class('rs-drawer-footer');
    expect(container.firstChild).to.have.text(title);
  });
});
