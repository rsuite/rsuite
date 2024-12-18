import React from 'react';
import sinon from 'sinon';
import { render, screen, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

import Drawer from '../Drawer';

describe('Drawer.Header', () => {
  testStandardProps(<Drawer.Header />);

  it('Should render a drawer header', () => {
    const { container } = render(<Drawer.Header>header</Drawer.Header>);

    expect(container.firstChild).to.have.class('rs-drawer-header');
    expect(container.firstChild).to.have.text('header');
  });

  it('Should hide close button', () => {
    render(<Drawer.Header closeButton={false}>header</Drawer.Header>);

    expect(screen.queryByRole('button')).to.not.exist;
  });

  it('Should call onClose callback', () => {
    const onClose = sinon.spy();
    render(<Drawer.Header onClose={onClose} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).to.have.been.calledOnce;
  });
});
