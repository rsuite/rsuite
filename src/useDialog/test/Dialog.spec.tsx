import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../Dialog';

describe('Dialog', () => {
  it('Should render alert dialog', () => {
    render(
      <Dialog
        type="alert"
        title="Alert Title"
        content="This is an alert"
        okText="OK"
        cancelText="Cancel"
        onClose={() => {}}
      />
    );

    expect(screen.getByRole('dialog')).to.exist;
    expect(screen.getByText('Alert Title')).to.exist;
    expect(screen.getByText('This is an alert')).to.exist;
    expect(screen.getByText('OK')).to.exist;
    expect(screen.queryByText('Cancel')).to.not.exist;
  });

  it('Should render confirm dialog with cancel button', () => {
    render(
      <Dialog
        type="confirm"
        title="Confirm Title"
        content="Are you sure?"
        okText="Yes"
        cancelText="No"
        onClose={() => {}}
      />
    );

    expect(screen.getByRole('dialog')).to.exist;
    expect(screen.getByText('Confirm Title')).to.exist;
    expect(screen.getByText('Are you sure?')).to.exist;
    expect(screen.getByText('Yes')).to.exist;
    expect(screen.getByText('No')).to.exist;
  });

  it('Should render prompt dialog with input field', () => {
    render(
      <Dialog
        type="prompt"
        title="Prompt Title"
        content="Enter your name:"
        okText="Submit"
        cancelText="Cancel"
        defaultValue="John"
        onClose={() => {}}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).to.exist;
    expect(input.value).to.equal('John');
  });

  it('Should call onClose with true when clicking OK button', async () => {
    const onClose = vi.fn();
    render(
      <Dialog type="confirm" content="Test" okText="OK" cancelText="Cancel" onClose={onClose} />
    );

    fireEvent.click(screen.getByText('OK'));

    // Wait for the animation to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    expect(onClose).toHaveBeenCalledWith(true);
  });

  it('Should call onClose when clicking Cancel button', async () => {
    const onClose = vi.fn();
    render(
      <Dialog
        type="confirm"
        open
        header="Confirm Action"
        content="Are you sure?"
        onClose={onClose}
        okText="OK"
        cancelText="Cancel"
      />
    );

    // Wait for any animations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Find the Cancel button by its text content
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).to.exist;

    // Click the Cancel button
    fireEvent.click(cancelButton);

    // Wait for any state updates and animations
    await new Promise(resolve => setTimeout(resolve, 500));

    expect(onClose).toHaveBeenCalled();
  });

  it('Should call onClose with input value when pressing Enter in prompt', async () => {
    const onClose = vi.fn();
    render(
      <Dialog
        type="prompt"
        content="Enter text:"
        okText="OK"
        cancelText="Cancel"
        showCancelButton
        defaultValue="initial"
        onClose={onClose}
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test input' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // Wait for the animation to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    expect(onClose).toHaveBeenCalledWith('test input');
  });

  it('Should apply severity color to OK button', () => {
    render(
      <Dialog
        type="alert"
        content="Test"
        okText="OK"
        cancelText="Cancel"
        showCancelButton
        severity="error"
        onClose={() => {}}
      />
    );

    const okButton = screen.getByRole('button', { name: 'OK' });

    expect(okButton).to.have.class('rs-btn-red');
  });
});
