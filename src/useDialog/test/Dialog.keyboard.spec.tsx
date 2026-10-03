import React from 'react';
import { createPortal } from 'react-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import Dialog, { DialogProps } from '../Dialog';
import useDialog from '../useDialog';
import CustomProvider from '../../CustomProvider';
import Modal from '../../Modal';

describe('Dialog keyboard interactions', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const finishAnimations = () => {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  };

  const renderDialog = (props: Omit<Partial<DialogProps>, 'onClose'> = {}) => {
    const onClose = vi.fn();

    render(<Dialog type="confirm" content="Dialog content" onClose={onClose} {...props} />);
    finishAnimations();

    return { onClose, wrapper: screen.getAllByTestId('modal-wrapper')[0] };
  };

  it.each(['alert', 'confirm'] as const)(
    'Should confirm %s when Enter is pressed on the initially focused container',
    async type => {
      const { onClose, wrapper } = renderDialog({ type });

      expect(document.activeElement).to.equal(wrapper);
      await act(async () => {
        await userEvent.keyboard('{Enter}');
      });
      finishAnimations();

      expect(onClose).toHaveBeenCalledExactlyOnceWith(true);
      expect(screen.queryByRole('dialog')).to.not.exist;
    }
  );

  it.each(['alert', 'confirm', 'prompt'] as const)(
    'Should cancel %s when Escape is pressed',
    type => {
      const { onClose } = renderDialog({ type, defaultValue: 'Prompt value' });

      fireEvent.keyDown(document, { key: 'Escape' });
      finishAnimations();

      expect(onClose).toHaveBeenCalledExactlyOnceWith(false);
      expect(screen.queryByRole('dialog')).to.not.exist;
    }
  );

  it('Should return the same result for prompt cancellation with Escape and Cancel', () => {
    const escapeClose = renderDialog({ type: 'prompt', defaultValue: 'Prompt value' }).onClose;

    fireEvent.keyDown(document, { key: 'Escape' });
    finishAnimations();

    const cancelClose = renderDialog({ type: 'prompt', defaultValue: 'Prompt value' }).onClose;

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    finishAnimations();

    expect(escapeClose).toHaveBeenCalledExactlyOnceWith(false);
    expect(cancelClose).toHaveBeenCalledExactlyOnceWith(false);
  });

  it.each([
    ['an active composition', { isComposing: true }],
    ['the IME processing key code', { keyCode: 229 }]
  ] as const)('Should not cancel a prompt with Escape during %s', (_description, eventOptions) => {
    const { onClose } = renderDialog({ type: 'prompt', defaultValue: 'Prompt value' });

    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape', ...eventOptions });
    finishAnimations();

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).to.exist;

    fireEvent.keyDown(document, { key: 'Escape' });
    finishAnimations();

    expect(onClose).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('Should allow custom content to prevent Escape cancellation', () => {
    const { onClose } = renderDialog({
      content: <input aria-label="Custom input" onKeyDown={event => event.preventDefault()} />
    });

    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
    finishAnimations();

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).to.exist;

    fireEvent.keyDown(document, { key: 'Escape' });
    finishAnimations();

    expect(onClose).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('Should allow onEsc to prevent Escape cancellation', () => {
    const onEsc = vi.fn((event: React.KeyboardEvent) => event.preventDefault());
    const { onClose } = renderDialog({ onEsc });

    fireEvent.keyDown(document, { key: 'Escape' });
    finishAnimations();

    expect(onEsc).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).to.exist;

    onEsc.mockImplementation(() => {});
    fireEvent.keyDown(document, { key: 'Escape' });
    finishAnimations();

    expect(onEsc).toHaveBeenCalledTimes(2);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('Should validate prompt input before confirming with Enter', () => {
    const validate = vi.fn((value: string): [boolean, string?] => [
      value.length >= 3,
      'Please enter at least three characters'
    ]);
    const { onClose } = renderDialog({ type: 'prompt', validate });
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Jo' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    finishAnimations();

    expect(validate).toHaveBeenCalledExactlyOnceWith('Jo');
    expect(screen.getByText('Please enter at least three characters')).to.exist;
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: 'John' } });
    expect(screen.queryByText('Please enter at least three characters')).to.not.exist;

    fireEvent.keyDown(input, { key: 'Enter' });
    finishAnimations();

    expect(validate).toHaveBeenCalledTimes(2);
    expect(onClose).toHaveBeenCalledExactlyOnceWith('John');
  });

  it.each(['alert', 'confirm', 'prompt'] as const)(
    'Should preserve Enter confirmation when keyboard=false disables Escape for %s',
    type => {
      const { onClose, wrapper } = renderDialog({
        type,
        keyboard: false,
        defaultValue: 'Prompt value'
      });

      fireEvent.keyDown(document, { key: 'Escape' });
      finishAnimations();

      expect(onClose).not.toHaveBeenCalled();
      expect(screen.getByRole('dialog')).to.exist;

      fireEvent.keyDown(type === 'prompt' ? screen.getByRole('textbox') : wrapper, {
        key: 'Enter'
      });
      finishAnimations();

      expect(onClose).toHaveBeenCalledExactlyOnceWith(type === 'prompt' ? 'Prompt value' : true);
    }
  );

  it.each([
    ['an active composition', { isComposing: true }],
    ['the IME processing key code', { keyCode: 229 }],
    ['a held key', { repeat: true }],
    ['Shift', { shiftKey: true }],
    ['Control', { ctrlKey: true }],
    ['Alt', { altKey: true }],
    ['Meta', { metaKey: true }]
  ] as const)('Should not confirm with Enter during %s', (_description, eventOptions) => {
    const { onClose } = renderDialog({ type: 'prompt', defaultValue: 'Prompt value' });
    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, { key: 'Enter', ...eventOptions });
    finishAnimations();

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).to.exist;

    fireEvent.keyDown(input, { key: 'Enter' });
    finishAnimations();

    expect(onClose).toHaveBeenCalledExactlyOnceWith('Prompt value');
  });

  it.each(['alert', 'prompt'] as const)(
    'Should allow a custom onKeyDown to prevent Enter confirmation for %s',
    type => {
      const onKeyDown = vi.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { onClose, wrapper } = renderDialog({ type, onKeyDown });

      fireEvent.keyDown(type === 'prompt' ? screen.getByRole('textbox') : wrapper, {
        key: 'Enter'
      });
      finishAnimations();

      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onClose).not.toHaveBeenCalled();
      expect(screen.getByRole('dialog')).to.exist;
    }
  );

  it('Should invoke a custom onKeyDown without preventing Enter confirmation', () => {
    const onKeyDown = vi.fn();
    const { onClose, wrapper } = renderDialog({ type: 'alert', onKeyDown });

    fireEvent.keyDown(wrapper, { key: 'Enter' });
    finishAnimations();

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('Should preserve Enter handling in custom dialog content', () => {
    const onContentKeyDown = vi.fn();
    const { onClose } = renderDialog({
      content: (
        <div onKeyDown={onContentKeyDown}>
          <textarea aria-label="Multiline input" />
          <input aria-label="Custom input" />
          <select aria-label="Custom select">
            <option>Option</option>
          </select>
          <div contentEditable suppressContentEditableWarning>
            <span>Editable content</span>
          </div>
          <a href="#custom-link">Custom link</a>
          <div role="button" tabIndex={0}>
            Custom action
          </div>
        </div>
      )
    });
    const targets = [
      screen.getByRole('textbox', { name: 'Multiline input' }),
      screen.getByRole('textbox', { name: 'Custom input' }),
      screen.getByRole('combobox', { name: 'Custom select' }),
      screen.getByText('Editable content'),
      screen.getByRole('link', { name: 'Custom link' }),
      screen.getByRole('button', { name: 'Custom action' })
    ];

    targets.forEach(target => fireEvent.keyDown(target, { key: 'Enter' }));
    finishAnimations();

    expect(onContentKeyDown).toHaveBeenCalledTimes(targets.length);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).to.exist;
  });

  it('Should insert a newline in a focused textarea with native Enter', async () => {
    const { onClose } = renderDialog({ content: <textarea aria-label="Multiline input" /> });
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    act(() => {
      textarea.focus();
    });

    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    finishAnimations();

    expect(textarea.value).to.equal('\n');
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).to.exist;
  });

  it('Should not confirm the outer dialog from content rendered in a portal', () => {
    const { onClose } = renderDialog({
      content: createPortal(<input aria-label="Portal input" />, document.body)
    });

    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Portal input' }), { key: 'Enter' });
    finishAnimations();

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).to.exist;
  });

  it('Should not confirm the outer dialog from a nested modal', () => {
    const { onClose } = renderDialog({
      content: (
        <Modal open enforceFocus={false} autoFocus={false}>
          <Modal.Body>Nested modal content</Modal.Body>
        </Modal>
      )
    });
    const nestedWrapper = screen
      .getAllByTestId('modal-wrapper')
      .find(wrapper => wrapper.textContent?.includes('Nested modal content'));

    expect(nestedWrapper).to.exist;
    fireEvent.keyDown(nestedWrapper!, { key: 'Enter' });
    finishAnimations();

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getAllByRole('dialog')).to.have.length(2);
  });

  it.each([
    ['Cancel', false],
    ['OK', true]
  ] as const)(
    'Should activate the focused %s button once with native Enter',
    async (name, result) => {
      const { onClose } = renderDialog();
      const button = screen.getByRole('button', { name });

      act(() => {
        button.focus();
      });

      await act(async () => {
        await userEvent.keyboard('{Enter}');
      });
      finishAnimations();

      expect(onClose).toHaveBeenCalledExactlyOnceWith(result);
    }
  );

  it('Should retain the first result and close only once while the dialog is closing', () => {
    const { onClose, wrapper } = renderDialog();
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    fireEvent.keyDown(wrapper, { key: 'Enter' });
    fireEvent.keyDown(wrapper, { key: 'Enter' });
    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.click(cancelButton);
    finishAnimations();

    expect(onClose).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('Should close only the topmost dialog with Escape', () => {
    const bottomClose = vi.fn();
    const topClose = vi.fn();

    render(
      <>
        <Dialog type="confirm" content="Bottom dialog" onClose={bottomClose} />
        <Dialog type="confirm" content="Top dialog" onClose={topClose} />
      </>
    );
    finishAnimations();

    fireEvent.keyDown(document, { key: 'Escape' });
    finishAnimations();

    expect(topClose).toHaveBeenCalledExactlyOnceWith(false);
    expect(bottomClose).not.toHaveBeenCalled();
    expect(screen.getByText('Bottom dialog')).to.exist;
    expect(screen.queryByText('Top dialog')).to.not.exist;

    fireEvent.keyDown(document, { key: 'Escape' });
    finishAnimations();

    expect(bottomClose).toHaveBeenCalledExactlyOnceWith(false);
    expect(topClose).toHaveBeenCalledTimes(1);
  });

  it.each([
    { type: 'alert', key: 'Enter', expected: true },
    { type: 'confirm', key: 'Enter', expected: true },
    { type: 'confirm', key: 'Escape', expected: false },
    { type: 'prompt', key: 'Escape', expected: false },
    { type: 'prompt', key: 'Enter', expected: 'Prompt value' }
  ] as const)(
    'Should resolve useDialog.$type and remove its dialog after $key',
    async ({ type, key, expected }) => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CustomProvider>{children}</CustomProvider>
      );
      const { result } = renderHook(() => useDialog(), { wrapper });
      const onResolve = vi.fn();

      await act(async () => {
        result.current[type]('Hook dialog content', { defaultValue: 'Prompt value' }).then(
          onResolve
        );
      });
      finishAnimations();

      expect(screen.getByText('Hook dialog content')).to.exist;
      const target =
        key === 'Escape'
          ? document
          : type === 'prompt'
            ? screen.getByRole('textbox')
            : screen.getByTestId('modal-wrapper');

      fireEvent.keyDown(target, { key });
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      expect(onResolve).toHaveBeenCalledExactlyOnceWith(expected);
      expect(screen.queryByRole('dialog')).to.not.exist;
    }
  );
});
