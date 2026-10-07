import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import AutoComplete from '..';
import '../styles/index.scss';

const targets = [
  { name: 'double quote', value: 'a"b' },
  { name: 'backslash', value: 'a\\b' }
];

async function nativeKey(key: string) {
  await act(async () => {
    await userEvent.keyboard(`{${key}}`);
  });
}

describe('AutoComplete literal option key scrolling', () => {
  it.each(targets)('scrolls to $name while focus remains on the input', async target => {
    const data = [
      { value: 'source-1', label: 'Source one' },
      { value: 'source-2', label: 'Source two' },
      { value: 'source-3', label: 'Source three' },
      { value: target.value, label: 'Destination option' }
    ];
    const onChange = vi.fn();
    const onSelect = vi.fn();
    const onMenuFocus = vi.fn();
    const keys: KeyboardEvent[] = [];
    const capture = (event: KeyboardEvent) => keys.push(event);
    render(
      <AutoComplete
        data={data}
        defaultValue="source-1"
        open
        filterBy={() => true}
        onChange={onChange}
        onSelect={onSelect}
        onMenuFocus={onMenuFocus}
        renderListbox={listbox => {
          if (!React.isValidElement<{ focusItemValue?: string }>(listbox)) {
            throw new Error('Expected the public AutoComplete listbox element');
          }
          return (
            <div role="listbox" style={{ height: 80, overflowY: 'auto' }}>
              {data.map(item => (
                <div
                  key={item.value}
                  role="option"
                  aria-disabled={false}
                  data-key={item.value}
                  data-focused={item.value === listbox.props.focusItemValue}
                  style={{ height: 40, boxSizing: 'border-box' }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          );
        }}
      />
    );
    const input = screen.getByRole('combobox');
    await waitFor(() => expect(screen.getAllByRole('option')).to.have.length(4));
    const listbox = screen.getByRole('listbox');
    expect(listbox.scrollHeight).to.be.greaterThan(listbox.clientHeight);
    expect(listbox.scrollTop).to.equal(0);
    act(() => input.focus());
    expect(input).to.have.focus;
    document.addEventListener('keydown', capture, true);
    try {
      await nativeKey('ArrowDown');
      expect(onMenuFocus).toHaveBeenLastCalledWith('source-2', expect.anything());
      expect(screen.getByRole('option', { name: 'Source two' })).to.have.attribute(
        'data-focused',
        'true'
      );
      await nativeKey('ArrowDown');
      expect(onMenuFocus).toHaveBeenLastCalledWith('source-3', expect.anything());
      expect(screen.getByRole('option', { name: 'Source three' })).to.have.attribute(
        'data-focused',
        'true'
      );
      expect(input).to.have.focus;
      const destination = screen.getByRole('option', { name: 'Destination option' });
      const beforeScroll = listbox.scrollTop;
      expect(beforeScroll).to.be.greaterThan(0);
      expect(destination.getBoundingClientRect().top).to.be.at.least(
        listbox.getBoundingClientRect().bottom
      );
      await nativeKey('ArrowDown');
      expect(keys.map(event => event.key)).to.deep.equal(Array(3).fill('ArrowDown'));
      expect(keys.every(event => event.isTrusted)).to.be.true;
      expect(input).to.have.focus;
      expect(onMenuFocus).toHaveBeenCalledTimes(3);
      expect(onMenuFocus).toHaveBeenLastCalledWith(target.value, expect.anything());
      expect(destination).to.have.attribute('data-focused', 'true');
      expect(destination).to.have.attribute('data-key', target.value);
      expect(onChange).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(listbox.scrollTop).to.be.greaterThan(beforeScroll);
        const rowBounds = destination.getBoundingClientRect();
        const listBounds = listbox.getBoundingClientRect();
        expect(rowBounds.height).to.be.greaterThan(0);
        expect(rowBounds.top).to.be.at.least(listBounds.top);
        expect(rowBounds.bottom).to.be.at.most(listBounds.bottom);
      });
      expect(input).to.have.focus;
      await nativeKey('Enter');
      expect(keys.map(event => event.key)).to.deep.equal([...Array(3).fill('ArrowDown'), 'Enter']);
      expect(keys.every(event => event.isTrusted)).to.be.true;
      expect(onChange).toHaveBeenCalledExactlyOnceWith(target.value, expect.anything());
      expect(onSelect).toHaveBeenCalledExactlyOnceWith(target.value, data[3], expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
    } finally {
      document.removeEventListener('keydown', capture, true);
    }
  });
});
