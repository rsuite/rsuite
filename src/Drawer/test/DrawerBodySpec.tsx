import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

import Drawer from '../index';

describe('Drawer.Body', () => {
  testStandardProps(<Drawer.Body />);

  it('Should render a drawer body', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Body>{title}</Drawer.Body>);
    expect(container.firstChild).to.have.class('rs-drawer-body');
    expect(container.firstChild).to.have.text(title);
  });

  context('Ref', () => {
    it('Should return an HTMLDivElement to ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Drawer.Body ref={ref} />);

      expect(ref.current).to.be.instanceOf(HTMLDivElement);
    });
  });
});
