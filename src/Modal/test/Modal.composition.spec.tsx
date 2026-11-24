import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import Modal from '..';
import Drawer from '../../Drawer';
import '../styles/index.scss';
import '../../Drawer/styles/index.scss';

describe.each([
  ['Modal', Modal],
  ['Drawer', Drawer]
] as const)('%s composition keyboard boundaries', (_name, Component) => {
  describe.each(['active', 'opening', 'closing'] as const)('%s composition', phase => {
    it.each(['Escape', 'Tab'])('leaves %s to the IME', async key => {
      const onClose = vi.fn();
      const onEsc = vi.fn();
      const onEntered = vi.fn();
      const onKeyDown = vi.fn();
      render(
        <Component
          open
          animationTimeout={0}
          onEntered={onEntered}
          onClose={onClose}
          onEsc={onEsc}
          onKeyDown={onKeyDown}
        >
          <input aria-label="Compose text" />
        </Component>
      );
      await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
      const input = screen.getByRole('textbox');
      input.focus();
      if (phase !== 'opening') fireEvent.compositionStart(input);
      if (phase === 'closing') fireEvent.compositionEnd(input);
      const event = new KeyboardEvent('keydown', {
        key,
        isComposing: phase === 'active',
        keyCode: phase === 'active' ? 0 : 229,
        bubbles: true,
        cancelable: true
      });
      fireEvent(input, event);
      expect(onClose).not.toHaveBeenCalled();
      expect(onEsc).not.toHaveBeenCalled();
      expect(event.defaultPrevented).to.be.false;
      expect(document.activeElement).to.equal(input);
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onKeyDown.mock.calls[0][0].nativeEvent).to.equal(event);

      if (phase === 'opening') fireEvent.compositionStart(input);
      if (phase !== 'closing') fireEvent.compositionEnd(input);
      fireEvent.keyUp(input, { key, isComposing: false });
      expect(onClose).not.toHaveBeenCalled();
      await userEvent.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onEsc).toHaveBeenCalledTimes(1);
      expect(onKeyDown).toHaveBeenCalledTimes(2);
      expect(onKeyDown.mock.calls[1][0].nativeEvent.isTrusted).to.be.true;
    });
  });
});
