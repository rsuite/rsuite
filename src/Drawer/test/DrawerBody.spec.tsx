import React from 'react';
import Drawer from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Drawer.Body', () => {
  testStandardProps(<Drawer.Body />);

  it('Should render a drawer body', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Body>{title}</Drawer.Body>);
    expect(container.firstChild).to.have.class('rs-drawer-body');
    expect(container.firstChild).to.have.text(title);
  });

  describe('Ref', () => {
    it('Should return an HTMLDivElement to ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Drawer.Body ref={ref} />);

      expect(ref.current).to.be.instanceOf(HTMLDivElement);
    });
  });
});
