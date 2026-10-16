import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect, vi } from 'vitest';
import SelectPicker from '../../../SelectPicker';
import Modal from '../../../Modal';
import Drawer from '../../../Drawer';
import '../../../SelectPicker/styles/index.scss';
import '../../../Modal/styles/index.scss';
import '../../../Drawer/styles/index.scss';

const data = [{ label: 'Alpha', value: 'a' }];

it('closes a responsive picker once on a normal Escape', async () => {
  const onEntered = vi.fn();
  const onClose = vi.fn();
  render(
    <SelectPicker
      data={data}
      defaultOpen
      responsive="(min-width: 0px)"
      onClose={onClose}
      onEntered={onEntered}
    />
  );
  await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
  screen.getByRole('searchbox').focus();
  await userEvent.keyboard('{Escape}');
  expect(onClose).toHaveBeenCalledOnce();
  expect(screen.getByRole('combobox')).to.have.attr('aria-expanded', 'false');
});

describe.each([
  ['Modal', Modal],
  ['Drawer', Drawer]
] as const)('%s Escape ownership', (_name, Component) => {
  it('closes the picker before its surrounding dialog without stopping propagation', async () => {
    const onEntered = vi.fn();
    const onPickerEntered = vi.fn();
    const onPickerClose = vi.fn();
    const onPickerExited = vi.fn();
    const onClose = vi.fn();
    const onKeyDown = vi.fn();
    const dialogProps = { open: true, animationTimeout: 0, onEntered, onClose, onKeyDown };
    const { rerender } = render(<Component {...dialogProps} />);
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    rerender(
      <Component {...dialogProps}>
        <SelectPicker
          data={data}
          defaultOpen
          responsive={false}
          container={() => screen.getByRole('dialog')}
          onEntered={onPickerEntered}
          onClose={onPickerClose}
          onExited={onPickerExited}
        />
      </Component>
    );
    await waitFor(() => expect(onPickerEntered).toHaveBeenCalledOnce());
    const input = screen.getByRole('searchbox');
    input.focus();
    await userEvent.keyboard('{Escape}');
    expect(onPickerClose).toHaveBeenCalledOnce();
    expect(onClose).not.toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalledOnce();
    expect(onKeyDown.mock.calls[0][0].nativeEvent.defaultPrevented).to.be.true;
    expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).to.be.true;
    await waitFor(() => expect(onPickerExited).toHaveBeenCalledOnce());
    const toggle = screen.getByRole('combobox');
    expect(toggle).to.have.attr('aria-expanded', 'false');
    toggle.focus();

    await userEvent.keyboard('{Escape}');
    expect(onPickerClose).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onKeyDown.mock.calls[1][0].nativeEvent.defaultPrevented).to.be.false;
    expect(onKeyDown.mock.calls[1][0].nativeEvent.isTrusted).to.be.true;
  });

  it('respects Escape handled by an input and still closes on the next unhandled Escape', async () => {
    const onEntered = vi.fn();
    const onClose = vi.fn();
    const onEsc = vi.fn();
    const handleKeyDown = vi.fn((event: React.KeyboardEvent) => event.preventDefault());
    render(
      <Component open animationTimeout={0} onEntered={onEntered} onClose={onClose} onEsc={onEsc}>
        <input aria-label="Handles Escape" onKeyDown={handleKeyDown} />
        <input aria-label="Normal input" />
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    screen.getByRole('textbox', { name: 'Handles Escape' }).focus();
    await userEvent.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
    expect(onEsc).not.toHaveBeenCalled();
    expect(handleKeyDown).toHaveBeenCalledOnce();
    expect(handleKeyDown.mock.calls[0][0].nativeEvent.isTrusted).to.be.true;

    screen.getByRole('textbox', { name: 'Normal input' }).focus();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
    expect(onEsc).toHaveBeenCalledOnce();
  });
});
