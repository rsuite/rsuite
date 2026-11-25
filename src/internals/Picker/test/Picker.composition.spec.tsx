import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import TagInput from '../../../TagInput';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../TreePicker/styles/index.scss';
import '../../../CheckTreePicker/styles/index.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';
import '../../../TagInput/styles/index.scss';
import '../../../Drawer/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' }
];
const pickers = [
  { name: 'SelectPicker', Component: SelectPicker, multiple: false, editable: false },
  { name: 'CheckPicker', Component: CheckPicker, multiple: true, editable: false },
  { name: 'TreePicker', Component: TreePicker, multiple: false, editable: false },
  { name: 'CheckTreePicker', Component: CheckTreePicker, multiple: true, editable: false },
  { name: 'Cascader', Component: Cascader, multiple: false, editable: false },
  { name: 'MultiCascader', Component: MultiCascader, multiple: true, editable: false },
  { name: 'InputPicker', Component: InputPicker, multiple: false, editable: true },
  { name: 'TagPicker', Component: TagPicker, multiple: true, editable: true },
  { name: 'TagInput', Component: TagInput, multiple: true, editable: true }
];

const compositionPhases = ['active', 'opening', 'closing'] as const;

describe('responsive picker composition', () => {
  it.each(compositionPhases)('keeps the Drawer open during %s composition', async phase => {
    const onClose = vi.fn();
    const onEntered = vi.fn();
    const onKeyDown = vi.fn();
    render(
      <SelectPicker
        data={data}
        defaultOpen
        responsive="(min-width: 0px)"
        onClose={onClose}
        onEntered={onEntered}
        {...{ onKeyDown }}
      />
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    expect(screen.getByRole('dialog')).to.have.class('rs-drawer');
    const input = screen.getByRole('searchbox');
    input.focus();
    const event = compositionKeyDown(input, 'Escape', phase);
    finishComposition(input, phase);
    fireEvent.keyUp(input, { key: 'Escape', isComposing: false });
    expect(onClose).not.toHaveBeenCalled();
    expect(document.activeElement).to.equal(input);
    expect(event.defaultPrevented).to.be.false;
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].nativeEvent).to.equal(event);

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onKeyDown.mock.calls[1][0].nativeEvent.isTrusted).to.be.true;
  });
});

function compositionKeyDown(
  input: HTMLElement,
  key: string,
  phase: (typeof compositionPhases)[number]
) {
  if (phase !== 'opening') fireEvent.compositionStart(input);
  if (phase === 'closing') fireEvent.compositionEnd(input);
  const event = new KeyboardEvent('keydown', {
    key,
    isComposing: phase === 'active',
    keyCode: phase === 'active' ? 0 : 229,
    bubbles: true,
    cancelable: true
  });
  expect(event.isComposing).to.equal(phase === 'active');
  expect(event.keyCode).to.equal(phase === 'active' ? 0 : 229);
  fireEvent(input, event);
  return event;
}

function finishComposition(input: HTMLElement, phase: (typeof compositionPhases)[number]) {
  if (phase === 'opening') fireEvent.compositionStart(input);
  if (phase !== 'closing') fireEvent.compositionEnd(input);
}

describe.each(pickers)('$name composition keyboard boundaries', entry => {
  const Component: React.ElementType = entry.Component;

  describe.each(compositionPhases)('%s composition', phase => {
    it.each(['Escape', 'Enter', 'ArrowDown', 'Backspace', 'Tab'])(
      'leaves %s to the input and resumes shortcuts after composition',
      async key => {
        const onChange = vi.fn();
        const onSelect = vi.fn();
        const onClose = vi.fn();
        const onKeyDown = vi.fn();
        render(
          <Component
            data={data}
            defaultOpen
            defaultValue={entry.multiple ? ['a'] : 'a'}
            onChange={onChange}
            onSelect={onSelect}
            onClose={onClose}
            onKeyDown={onKeyDown}
          />
        );
        const combo = screen.getByRole('combobox');
        const input =
          entry.name === 'TagInput'
            ? screen.getByRole('textbox')
            : entry.editable
              ? combo
              : screen.getByRole('searchbox');
        input.focus();
        const activeDescendant = input.getAttribute('aria-activedescendant');
        const event = compositionKeyDown(input, key, phase);

        expect(onChange).not.toHaveBeenCalled();
        expect(onSelect).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
        if (entry.name === 'TagInput') {
          expect(screen.getByTestId('picker')).to.have.attr('data-focus', 'true');
        } else {
          expect(combo).to.have.attr('aria-expanded', 'true');
        }
        expect(document.activeElement).to.equal(input);
        expect(input.getAttribute('aria-activedescendant')).to.equal(activeDescendant);
        expect(event.defaultPrevented).to.be.false;
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.calls[0][0].nativeEvent).to.equal(event);

        finishComposition(input, phase);
        // The IME may end composition before releasing its closing key.
        fireEvent.keyUp(input, { key, isComposing: false });
        expect(onClose).not.toHaveBeenCalled();
        expect(document.activeElement).to.equal(input);
        await userEvent.keyboard('{Escape}');
        if (entry.name === 'TagInput') {
          expect(screen.getByTestId('picker')).to.have.attr('data-focus', 'false');
        } else {
          expect(combo).to.have.attr('aria-expanded', 'false');
        }
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onKeyDown).toHaveBeenCalledTimes(2);
        expect(onKeyDown.mock.calls[1][0].nativeEvent.isTrusted).to.be.true;
        expect(onChange).not.toHaveBeenCalled();
      }
    );
  });
});

describe.each([
  { name: 'TagPicker', Component: TagPicker, role: 'combobox' },
  { name: 'TagInput', Component: TagInput, role: 'textbox' }
])('$name composition delimiters', entry => {
  const Component: React.ElementType = entry.Component;
  describe.each(['opening', 'closing'] as const)('%s composition', phase => {
    it.each([
      { trigger: 'Space', key: ' ' },
      { trigger: 'Comma', key: ',' }
    ])(
      'keeps the $trigger delimiter for the IME and creates a tag afterward',
      async ({ trigger, key }) => {
        const onCreate = vi.fn();
        const onChange = vi.fn();
        const onKeyDown = vi.fn();
        render(
          <Component
            data={data}
            defaultOpen
            creatable
            trigger={trigger}
            onCreate={onCreate}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        );
        const input = screen.getByRole(entry.role);
        input.focus();
        fireEvent.change(input, { target: { value: 'Gamma' } });
        const event = compositionKeyDown(input, key, phase);
        expect(onCreate).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
        expect(event.defaultPrevented).to.be.false;
        expect(input).to.have.value('Gamma');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.calls[0][0].nativeEvent).to.equal(event);

        finishComposition(input, phase);
        await userEvent.keyboard(key);
        expect(onCreate).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledExactlyOnceWith(['Gamma'], expect.any(Object));
        expect(onKeyDown).toHaveBeenCalledTimes(2);
        expect(onKeyDown.mock.calls[1][0].nativeEvent).to.equal(
          onChange.mock.calls[0][1].nativeEvent
        );
        expect(onKeyDown.mock.calls[1][0].nativeEvent.isTrusted).to.be.true;
      }
    );
  });
});
