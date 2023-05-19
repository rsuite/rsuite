import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import sinon from 'sinon';

import Drawer from '../Drawer';

describe('Drawer', () => {
  it('Should render a drawer', () => {
    render(
      <Drawer open>
        <p>message</p>
      </Drawer>
    );

    expect(screen.getByRole('dialog')).to.have.text('message');
  });

  it('Should have a `top` className for placement', () => {
    render(
      <Drawer open placement="top">
        <p>message</p>
      </Drawer>
    );

    expect(screen.getByRole('dialog')).to.have.class('rs-drawer-top');
  });

  it('Should have a custom className', () => {
    render(<Drawer className="custom" open />);
    expect(screen.getByRole('dialog')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<Drawer style={{ fontSize }} open />);
    expect(screen.getByRole('dialog')).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(<Drawer classPrefix="custom-prefix" open />);
    expect(screen.getByRole('dialog')).to.have.class('rs-custom-prefix');
  });

  it('Should close the drawer when the backdrop is clicked', () => {
    const onCloseSpy = sinon.spy();
    render(<Drawer data-testid="wrapper" open onClose={onCloseSpy} />);

    fireEvent.click(screen.getByTestId('wrapper'));

    assert.isTrue(onCloseSpy.calledOnce);
  });

  it('Should not close the drawer when the "static" drawer is clicked', () => {
    const onCloseSpy = sinon.spy();
    render(<Drawer data-testid="wrapper" open onClose={onCloseSpy} backdrop="static" />);

    fireEvent.click(screen.getByTestId('wrapper'));

    assert.isFalse(onCloseSpy.calledOnce);
  });

  describe('Size variants', () => {
    const sizes = ['lg', 'md', 'sm', 'xs', 'full'] as const;

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
