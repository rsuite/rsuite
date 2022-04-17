import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';

import Drawer from '../Drawer';

describe('Drawer', () => {
  it('Should render a drawer', () => {
    const instance = getDOMNode(
      <Drawer open>
        <p>message</p>
      </Drawer>
    );
    assert.isNotNull(instance.querySelectorAll('.rs-drawer.rs-drawer-right'));
  });

  it('Should have a `top` className for placement', () => {
    const instance = getDOMNode(
      <Drawer open placement="top">
        <p>message</p>
      </Drawer>
    );
    assert.isNotNull(instance.querySelectorAll('.rs-drawer-top'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Drawer className="custom" open />);
    assert.isNotNull(instance.querySelector('.rs-drawer.custom'));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Drawer style={{ fontSize }} open />);
    assert.equal(instance.querySelector('.rs-drawer').style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Drawer classPrefix="custom-prefix" open />);
    assert.isNotNull(instance.querySelector('.rs-custom-prefix'));
  });

  it('Should close the drawer when the backdrop is clicked', () => {
    const onCloseSpy = sinon.spy();
    const { getByTestId } = render(<Drawer data-testid="wrapper" open onClose={onCloseSpy} />);

    fireEvent.click(getByTestId('wrapper'));

    assert.isTrue(onCloseSpy.calledOnce);
  });

  it('Should not close the drawer when the "static" drawer is clicked', () => {
    const onCloseSpy = sinon.spy();
    const { getByTestId } = render(
      <Drawer data-testid="wrapper" open onClose={onCloseSpy} backdrop="static" />
    );

    fireEvent.click(getByTestId('wrapper'));

    assert.isFalse(onCloseSpy.calledOnce);
  });

  describe('Size variants', () => {
    const sizes = ['lg', 'md', 'sm', 'xs', 'full'];

    sizes.forEach(size => {
      const expectedClassName = `rs-drawer-${size}`;

      it(`Should have .${expectedClassName} class when size=${size}`, () => {
        render(<Drawer open size={size}></Drawer>);

        expect(screen.getByRole('dialog')).to.have.class(expectedClassName);
      });
    });

    // Remove this case when full prop is dropped
    it('[Deprecated] Should have .rs-drawer-full class when full=true', () => {
      sinon.spy(console, 'warn');
      render(<Drawer open full></Drawer>);

      expect(screen.getByRole('dialog')).to.have.class('rs-drawer-full');

      expect(console.warn).to.have.been.calledWith(
        '"full" property of "Modal" has been deprecated.\nUse size="full" instead.'
      );
    });
  });
});
