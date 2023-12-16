import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

import Drawer from '../index';

describe('Drawer.Title', () => {
  testStandardProps(<Drawer.Title />);

  it('Should render a drawer title', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Title>{title}</Drawer.Title>);
    expect(container.firstChild).to.have.class('rs-drawer-title');
    expect(container.firstChild).to.have.text(title);
  });
});
