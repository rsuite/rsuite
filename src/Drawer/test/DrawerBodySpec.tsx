import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { render } from '@testing-library/react';

import Drawer from '../index';

describe('Drawer.Body', () => {
  it('Should render a drawer body', () => {
    const title = 'Test';
    const instance = getDOMNode(<Drawer.Body>{title}</Drawer.Body>);
    assert.equal(instance.className, 'rs-drawer-body');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Drawer.Body className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Drawer.Body style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Drawer.Body classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
  });

  context('Ref', () => {
    it('Should return an HTMLDivElement to ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Drawer.Body ref={ref} />);

      expect(ref.current).to.be.instanceOf(HTMLDivElement);
    });
  });
});
