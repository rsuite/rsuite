import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import Modal from '../../../Modal';
import CustomProvider from '../../../CustomProvider';

describe('usePortal server rendering', () => {
  it.each([
    { name: 'closed', open: false },
    { name: 'open', open: true }
  ])('does not resolve a browser-only container when Modal is $name', ({ open }) => {
    const container = vi.fn(() => document.body);

    const html = renderToString(
      <Modal open={open} container={container}>
        <p>Modal content</p>
      </Modal>
    );

    expect(html).toBe('');
    expect(container).not.toHaveBeenCalled();
  });

  it('renders CustomProvider children without resolving its browser-only toast container', () => {
    const toastContainer = vi.fn(() => document.body);

    const html = renderToString(
      <CustomProvider toastContainer={toastContainer}>
        <button>Save</button>
      </CustomProvider>
    );

    expect(html).toBe('<button>Save</button>');
    expect(toastContainer).not.toHaveBeenCalled();
  });
});
