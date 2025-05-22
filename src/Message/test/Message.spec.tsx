import React from 'react';
import Message from '../Message';
import ToastContext from '../../toaster/ToastContext';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

// Mock the icon components to avoid React hooks errors in tests
vi.mock('@rsuite/icons/InfoRound', () => ({
  default: () => <svg data-testid="info-icon" />
}));

vi.mock('@rsuite/icons/CheckRound', () => ({
  default: () => <svg data-testid="check-icon" />
}));

vi.mock('@rsuite/icons/WarningRound', () => ({
  default: () => <svg data-testid="warning-icon" />
}));

vi.mock('@rsuite/icons/RemindRound', () => ({
  default: () => <svg data-testid="remind-icon" />
}));

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

    expect(screen.getByRole('alert').className).to.include('rs-message-info');
  });

  it('Should display icon', () => {
    render(<Message showIcon type="info" />);

    // Check for the presence of the icon using our mock
    expect(screen.getByTestId('info-icon')).to.exist;
    expect(screen.getByRole('alert').className).to.include('rs-message-has-icon');
  });

  it('Should be full', () => {
    render(<Message full />);
    expect(screen.getByRole('alert').className).to.include('rs-message-full');
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
