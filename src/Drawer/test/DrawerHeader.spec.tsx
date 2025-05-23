import React from 'react';
import Drawer from '../Drawer';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

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
    const onClose = vi.fn();
    render(<Drawer.Header onClose={onClose} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
