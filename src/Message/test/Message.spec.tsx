import React from 'react';
import Message from '../Message';
import ToastContext from '../../toaster/ToastContext';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Message', () => {
  testStandardProps(<Message />);

  it('Should render a Message', () => {
    render(<Message />);

    expect(screen.getByRole('alert')).to.class('rs-message');
  });

  it('Should render a title', () => {
    render(<Message header="title" />);

    expect(screen.getByRole('alert').className).to.include('rs-message-has-title');
    expect(screen.getByRole('alert')).to.text('title');
  });

  it('Should render a description', () => {
    render(<Message>description</Message>);

    expect(screen.getByRole('alert')).to.text('description');
  });

  it('Should be bordered', () => {
    render(<Message bordered />);

    expect(screen.getByRole('alert')).to.have.class('rs-message-bordered');
  });

  it('Should be centered', () => {
    render(<Message centered />);

    expect(screen.getByRole('alert')).to.have.class('rs-message-centered');
  });

  it('Should have a type', () => {
    render(<Message type="info" />);

    expect(screen.getByRole('alert')).to.have.class('rs-message-info');
  });

  it('Should display icon', () => {
    render(<Message showIcon type="info" />);

    expect(screen.getByRole('alert')).to.have.contain('.rs-message-icon');
    expect(screen.getByRole('alert')).to.have.class('rs-message-has-icon');
  });

  it('Should be full', () => {
    render(<Message full />);
    expect(screen.getByRole('alert')).to.have.class('rs-message-full');
  });

  it('Should be closable', () => {
    render(<Message closable />);

    expect(screen.getByRole('button', { name: /close/i })).to.exist;
  });

  it('Should call onClose callback', () => {
    const onClose = vi.fn();
    render(<Message closable onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Should call onClose callback by usedToaster', async () => {
    const onClose = vi.fn();
    render(
      <ToastContext.Provider value={{ usedToaster: true }}>
        <Message duration={1} onClose={onClose} />
      </ToastContext.Provider>
    );

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
