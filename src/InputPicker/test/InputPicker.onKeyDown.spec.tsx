import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import InputPicker from '..';
import TagPicker from '../../TagPicker';
import TagInput from '../../TagInput';
import '../styles/index.scss';
import '../../TagPicker/styles/index.scss';
import '../../TagInput/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' }
];
const pickers = [
  { name: 'InputPicker', Component: InputPicker, multiple: false, role: 'combobox' },
  { name: 'TagPicker', Component: TagPicker, multiple: true, role: 'combobox' },
  { name: 'TagInput', Component: TagInput, multiple: true, role: 'textbox' }
];

describe.each(pickers)('$name keyboard callbacks', entry => {
  const Component: React.ElementType = entry.Component;

  it.each(['absent', 'undefined', 'handler'])(
    'preserves Backspace with onKeyDown=%s',
    async callback => {
      const onChange = vi.fn();
      const onKeyDown = vi.fn();
      render(
        <Component
          data={data}
          defaultOpen
          defaultValue={entry.multiple ? ['a'] : 'a'}
          onChange={onChange}
          {...(callback === 'absent'
            ? {}
            : { onKeyDown: callback === 'handler' ? onKeyDown : undefined })}
        />
      );
      const input = screen.getByRole(entry.role);
      input.focus();
      await userEvent.keyboard('{Backspace}');

      expect(onChange).toHaveBeenCalledExactlyOnceWith(
        entry.multiple ? [] : null,
        expect.any(Object)
      );
      expect(document.querySelectorAll('.rs-tag')).to.have.length(0);
      if (callback === 'handler') {
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.calls[0][0].nativeEvent).to.equal(
          onChange.mock.calls[0][1].nativeEvent
        );
        expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).to.be.true;
      }
    }
  );

  it('closes on Escape before the public callback moves focus', async () => {
    const onClose = vi.fn();
    const closesAtCallback: number[] = [];
    const onKeyDown = vi.fn<React.KeyboardEventHandler>(() => {
      closesAtCallback.push(onClose.mock.calls.length);
      screen.getByRole('button', { name: 'Outside' }).focus();
    });
    render(
      <>
        <Component data={data} defaultOpen onClose={onClose} onKeyDown={onKeyDown} />
        <button>Outside</button>
      </>
    );
    screen.getByRole(entry.role).focus();
    await userEvent.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(closesAtCallback).to.deep.equal([1]);
    expect(screen.getByTestId('picker')).to.have.attr('data-focus', 'false');
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).to.be.true;
    expect(document.activeElement).to.equal(screen.getByRole('button', { name: 'Outside' }));
  });
});

describe.each(pickers.slice(0, 2))('$name option keyboard callbacks', entry => {
  const Component: React.ElementType = entry.Component;

  it.each([false, true])('navigates and selects with searchable=%s', async searchable => {
    const onChange = vi.fn();
    const onKeyDown = vi.fn();
    render(
      <Component
        data={data}
        defaultOpen
        searchable={searchable}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
    screen.getByRole('combobox').focus();
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      entry.multiple ? ['a'] : 'a',
      expect.any(Object)
    );
    expect(onKeyDown.mock.calls.map(([event]) => event.key)).to.deep.equal(['ArrowDown', 'Enter']);
    expect(onKeyDown.mock.calls.every(([event]) => event.nativeEvent.isTrusted)).to.be.true;
    expect(onKeyDown.mock.calls[1][0].nativeEvent).to.equal(onChange.mock.calls[0][1].nativeEvent);
  });
});

describe.each(pickers.slice(1))('$name creation keyboard callbacks', entry => {
  const Component: React.ElementType = entry.Component;

  describe.each([
    { trigger: 'Enter', key: 'Enter', keyboard: '{Enter}' },
    { trigger: 'Space', key: ' ', keyboard: ' ' },
    { trigger: 'Comma', key: ',', keyboard: ',' }
  ])('$trigger', ({ trigger, key, keyboard }) => {
    it.each(['absent', 'undefined', 'handler'])(
      'creates one tag with onKeyDown=%s',
      async callback => {
        const onChange = vi.fn();
        const onCreate = vi.fn();
        const onKeyDown = vi.fn();
        render(
          <Component
            data={data}
            defaultOpen
            creatable
            trigger={trigger}
            onChange={onChange}
            onCreate={onCreate}
            {...(callback === 'absent'
              ? {}
              : { onKeyDown: callback === 'handler' ? onKeyDown : undefined })}
          />
        );
        const input = screen.getByRole(entry.role);
        input.focus();
        await userEvent.type(input, 'Gamma');
        onKeyDown.mockClear();
        await userEvent.keyboard(keyboard);

        expect(onChange).toHaveBeenCalledExactlyOnceWith(['Gamma'], expect.any(Object));
        expect(onCreate).toHaveBeenCalledTimes(1);
        expect(screen.getByText('Gamma', { selector: '.rs-tag-text' })).to.exist;
        if (callback === 'handler') {
          expect(onKeyDown).toHaveBeenCalledTimes(1);
          expect(onKeyDown.mock.calls[0][0].key).to.equal(key);
          expect(onKeyDown.mock.calls[0][0].nativeEvent).to.equal(
            onChange.mock.calls[0][1].nativeEvent
          );
          expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).to.be.true;
        }
      }
    );
  });

  describe.each([
    { trigger: 'Space', key: ' ' },
    { trigger: 'Comma', key: ',' }
  ])('$trigger boundaries', ({ trigger, key }) => {
    it.each(['disabled', 'readOnly', 'loading'])(
      'does not create or consume the delimiter after becoming %s',
      state => {
        const onChange = vi.fn();
        const onCreate = vi.fn();
        const onKeyDown = vi.fn();
        const props = { data, open: true, creatable: true, trigger, onChange, onCreate, onKeyDown };
        const { rerender } = render(<Component {...props} />);
        fireEvent.change(screen.getByRole(entry.role), { target: { value: 'Gamma' } });
        rerender(<Component {...props} {...{ [state]: true }} />);
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        fireEvent(screen.getByTestId('picker'), event);

        expect(onCreate).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
        expect(event.defaultPrevented).to.be.false;
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.calls[0][0].nativeEvent).to.equal(event);
      }
    );

    it.each(['absent', 'undefined', 'handler'])(
      'leaves composing delimiters untouched with onKeyDown=%s',
      callback => {
        const onChange = vi.fn();
        const onCreate = vi.fn();
        const onKeyDown = vi.fn();
        render(
          <Component
            data={data}
            defaultOpen
            creatable
            trigger={trigger}
            onChange={onChange}
            onCreate={onCreate}
            {...(callback === 'absent'
              ? {}
              : { onKeyDown: callback === 'handler' ? onKeyDown : undefined })}
          />
        );
        const input = screen.getByRole(entry.role);
        fireEvent.change(input, { target: { value: 'Gamma' } });
        fireEvent.compositionStart(input);
        const event = new KeyboardEvent('keydown', {
          key,
          isComposing: true,
          bubbles: true,
          cancelable: true
        });
        fireEvent(input, event);
        fireEvent.compositionEnd(input);

        expect(onCreate).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
        expect(event.defaultPrevented).to.be.false;
        expect(input).to.have.value('Gamma');
        if (callback === 'handler') {
          expect(onKeyDown).toHaveBeenCalledTimes(1);
          expect(onKeyDown.mock.calls[0][0].nativeEvent).to.equal(event);
        }
      }
    );
  });
});

it('reports controlled TagInput deletion once and waits for the supplied value', async () => {
  const onChange = vi.fn();
  const onKeyDown = vi.fn();
  const { rerender } = render(
    <TagInput open value={['Alpha']} onChange={onChange} onKeyDown={onKeyDown} />
  );
  screen.getByRole('textbox').focus();
  await userEvent.keyboard('{Backspace}');
  expect(onChange).toHaveBeenCalledExactlyOnceWith([], expect.any(Object));
  expect(onKeyDown).toHaveBeenCalledTimes(1);
  expect(screen.getByText('Alpha', { selector: '.rs-tag-text' })).to.exist;
  rerender(<TagInput open value={[]} onChange={onChange} onKeyDown={onKeyDown} />);
  expect(screen.queryByText('Alpha', { selector: '.rs-tag-text' })).to.be.null;
});
