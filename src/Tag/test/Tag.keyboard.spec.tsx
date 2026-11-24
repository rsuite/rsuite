import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import Tag from '../Tag';
import TagGroup from '../../TagGroup';
import TagPicker from '../../TagPicker';
import '../styles/index.scss';
import '../../TagPicker/styles/index.scss';

const native = (action: () => Promise<unknown>) => act(async () => void (await action()));

describe.each(['standalone', 'grouped', 'span'] as const)('Tag keyboard close (%s)', layout => {
  it.each(['{Enter}', ' '])('reaches and activates the close button with %s', async key => {
    const onClose = vi.fn();
    const onSubmit = vi.fn();
    const tag = (
      <Tag as={layout === 'span' ? 'span' : 'div'} closable onClose={onClose}>
        Alpha
      </Tag>
    );
    render(
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <button type="button">Before</button>
        {layout === 'grouped' ? <TagGroup>{tag}</TagGroup> : tag}
        <button type="button">After</button>
      </form>
    );
    const before = screen.getByRole('button', { name: 'Before' });
    const after = screen.getByRole('button', { name: 'After' });
    const close = screen.getByRole('button', { name: 'Remove' });
    act(() => before.focus());
    await native(() => userEvent.tab());
    expect(close).toHaveFocus();
    expect(getComputedStyle(close).outlineStyle).toBe('solid');
    expect(getComputedStyle(close).outlineWidth).toBe('2px');
    await native(() => userEvent.keyboard(key));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    await native(() => userEvent.tab());
    expect(after).toHaveFocus();
    await native(() => userEvent.tab({ shift: true }));
    expect(close).toHaveFocus();
    await native(() => userEvent.tab({ shift: true }));
    expect(before).toHaveFocus();
  });
});

describe('Tag close navigation', () => {
  it('visits every closable tag in a group in both directions', async () => {
    render(
      <>
        <button>Before</button>
        <TagGroup>
          <Tag closable data-testid="alpha">
            Alpha
          </Tag>
          <Tag>Read only</Tag>
          <Tag closable data-testid="beta">
            Beta
          </Tag>
        </TagGroup>
        <button>After</button>
      </>
    );
    const before = screen.getByRole('button', { name: 'Before' });
    const after = screen.getByRole('button', { name: 'After' });
    const alpha = within(screen.getByTestId('alpha')).getByRole('button', { name: 'Remove' });
    const beta = within(screen.getByTestId('beta')).getByRole('button', { name: 'Remove' });
    act(() => before.focus());
    for (const expected of [alpha, beta, after]) {
      await native(() => userEvent.tab());
      expect(expected).toHaveFocus();
      if (expected === alpha || expected === beta) {
        expect(getComputedStyle(expected).outlineStyle).toBe('solid');
        expect(getComputedStyle(expected).outlineWidth).toBe('2px');
      }
    }
    for (const expected of [beta, alpha, before]) {
      await native(() => userEvent.tab({ shift: true }));
      expect(expected).toHaveFocus();
    }
  });

  it('does not add a tab stop for a nonclosable tag', async () => {
    render(
      <>
        <button>Before</button>
        <Tag>Alpha</Tag>
        <button>After</button>
      </>
    );
    act(() => screen.getByRole('button', { name: 'Before' }).focus());
    await native(() => userEvent.tab());
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Remove' })).toBeNull();
  });

  it('keeps an option close control out of tab order and preserves pointer removal', async () => {
    const onClose = vi.fn();
    render(
      <>
        <button>Before</button>
        <div role="listbox" aria-label="Selected tags">
          <Tag role="option" aria-selected closable onClose={onClose}>
            Alpha
          </Tag>
        </div>
        <button>After</button>
      </>
    );
    act(() => screen.getByRole('button', { name: 'Before' }).focus());
    await native(() => userEvent.tab());
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    await native(() => userEvent.click(screen.getByRole('button', { name: 'Remove' })));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
  });

  it.each([false, true])(
    'preserves TagPicker tab order and pointer removal (searchable=%s)',
    async searchable => {
      const onChange = vi.fn();
      const onTagRemove = vi.fn();
      render(
        <>
          <button>Before</button>
          <TagPicker
            aria-label="Tags"
            data={[
              { label: 'Alpha', value: 'a' },
              { label: 'Beta', value: 'b' }
            ]}
            defaultValue={['a', 'b']}
            searchable={searchable}
            responsive={false}
            onChange={onChange}
            onTagRemove={onTagRemove}
          />
          <button>After</button>
        </>
      );
      const input = screen.getByRole('combobox', { name: 'Tags' });
      act(() => screen.getByRole('button', { name: 'Before' }).focus());
      await native(() => userEvent.tab());
      expect(input).toHaveFocus();
      await native(() => userEvent.tab());
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      expect(onChange).not.toHaveBeenCalled();
      const beta = screen.getByTitle('Beta');
      await native(() => userEvent.click(within(beta).getByRole('button', { name: 'Remove' })));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(['a']);
      expect(onTagRemove).toHaveBeenCalledTimes(1);
      expect(onTagRemove.mock.calls[0][0]).toBe('b');
      expect(onTagRemove.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    }
  );
});
