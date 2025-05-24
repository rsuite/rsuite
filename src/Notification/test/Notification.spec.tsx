import React from 'react';
import Notification from '../Notification';
import ToastContext from '../../toaster/ToastContext';
import { describe, expect, it, vi } from 'vitest';
import { waitFor, render, fireEvent, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Notification', () => {
  testStandardProps(<Notification />);

  it('Should output a notification', () => {
    render(<Notification />);

    expect(screen.getByRole('alert')).to.have.class('rs-notification');
  });

  it('Should render content', () => {
    render(<Notification>text</Notification>);

    expect(screen.getByRole('alert')).to.have.text('text');
  });

  it('Should be closable', () => {
    render(<Notification closable />);

    expect(screen.getByRole('button', { name: /close/i })).to.exist;
  });

  it('Should have a type', () => {
    render(<Notification type="info" header="info" />);

    expect(screen.getByRole('alert')).to.have.class('rs-notification-info');

    expect(screen.getByRole('alert').querySelector('.rs-icon')).to.have.attribute(
      'aria-label',
      'info round'
    );
  });

  it('Should have a header', () => {
    render(<Notification header="header" />);

    expect(screen.getByRole('alert')).to.have.text('header');
  });

  it('Should call onClose callback', () => {
    const onClose = vi.fn();
    render(<Notification closable onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Should call onClose callback by usedToaster', async () => {
    const onClose = vi.fn();
    render(
      <ToastContext.Provider value={{ usedToaster: true }}>
        <Notification duration={1} onClose={onClose} />
      </ToastContext.Provider>
    );

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
