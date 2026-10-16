import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import CheckTree from '..';
import CheckTreePicker from '../../CheckTreePicker';
import '../styles/index.scss';
import '../../CheckTreePicker/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' }
];
const props = { data, defaultOpen: true, searchable: false, height: 180, treeHeight: 180 };
const row = () => screen.getByRole('treeitem', { name: 'Alpha' });
const input = () => row().querySelector('input')!;
const label = () => row().querySelector<HTMLElement>('.rs-checkbox-label')!;
const click = async (target: Element, force = false) => {
  await act(async () => {
    await userEvent.click(target, { force });
  });
};

describe.each([
  ['CheckTree', CheckTree],
  ['CheckTreePicker', CheckTreePicker]
] as const)('%s native label selection', (_name, Component) => {
  describe.each([false, true])('virtualized=%s', virtualized => {
    it.each(['label', 'input'])('toggles once per %s activation', async target => {
      const onChange = vi.fn();
      const onSelect = vi.fn();
      const onSelectItem = vi.fn();
      render(
        <Component
          {...props}
          virtualized={virtualized}
          onChange={onChange}
          onSelect={onSelect}
          onSelectItem={onSelectItem}
        />
      );

      await click(target === 'label' ? label() : input());
      expect(input()).to.be.checked;
      expect(row()).to.have.attribute('aria-checked', 'true');
      expect(onChange).toHaveBeenCalledExactlyOnceWith(['alpha'], expect.anything());
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelectItem).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;

      await click(target === 'label' ? label() : input());
      expect(input()).not.to.be.checked;
      expect(row()).to.have.attribute('aria-checked', 'false');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).to.deep.equal([]);
      expect(onChange.mock.calls[1][1].nativeEvent.isTrusted).to.be.true;
      expect(onSelect).toHaveBeenCalledTimes(2);
      expect(onSelectItem).toHaveBeenCalledTimes(2);
    });

    it.each(['label', 'input'])('preserves callback focus after %s activation', async target => {
      const outside = React.createRef<HTMLButtonElement>();
      const onChange = vi.fn(() => outside.current?.focus());
      render(
        <>
          <Component {...props} virtualized={virtualized} onChange={onChange} />
          <button ref={outside}>Outside</button>
        </>
      );

      await click(target === 'label' ? label() : input());
      expect(outside.current).to.have.focus;
      expect(input()).to.be.checked;
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('respects a later focus choice queued by the owner', async () => {
      const outside = React.createRef<HTMLButtonElement>();
      const onChange = vi.fn(() => queueMicrotask(() => outside.current?.focus()));
      render(
        <>
          <Component {...props} virtualized={virtualized} onChange={onChange} />
          <button ref={outside}>Outside</button>
        </>
      );

      await click(label());
      expect(outside.current).to.have.focus;
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('keeps a controlled value unchanged until the owner accepts it', async () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <Component {...props} virtualized={virtualized} value={[]} onChange={onChange} />
      );
      await click(label());
      expect(input()).not.to.be.checked;
      expect(row()).to.have.attribute('aria-checked', 'false');
      expect(onChange).toHaveBeenCalledExactlyOnceWith(['alpha'], expect.anything());

      rerender(
        <Component {...props} virtualized={virtualized} value={['alpha']} onChange={onChange} />
      );
      expect(input()).to.be.checked;
      await click(label());
      expect(input()).to.be.checked;
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).to.deep.equal([]);
    });

    it('preserves an interactive descendant and its default action', async () => {
      const onChange = vi.fn();
      const submit = vi.fn();
      render(
        <form
          id="label-selection-form"
          onSubmit={event => {
            event.preventDefault();
            submit();
          }}
        >
          <Component
            {...props}
            virtualized={virtualized}
            onChange={onChange}
            renderTreeNode={node => (
              <>
                {node.label}
                <button type="submit" form="label-selection-form">
                  Action
                </button>
              </>
            )}
          />
        </form>
      );
      await click(within(row()).getByRole('button', { name: 'Action' }));
      expect(submit).toHaveBeenCalledTimes(1);
      expect(onChange).not.toHaveBeenCalled();
      expect(input()).not.to.be.checked;
    });

    it('respects a cancelled descendant click', async () => {
      const onChange = vi.fn();
      render(
        <Component
          {...props}
          virtualized={virtualized}
          onChange={onChange}
          renderTreeNode={node => (
            <span onClick={event => event.preventDefault()}>{node.label}</span>
          )}
        />
      );
      await click(within(row()).getByText('Alpha'));
      expect(onChange).not.toHaveBeenCalled();
      expect(input()).not.to.be.checked;
    });

    it.each(['disabled', 'disabledItemValues', 'uncheckableItemValues'])(
      'does not select a label with %s',
      async restriction => {
        const onChange = vi.fn();
        const clicks: boolean[] = [];
        const restricted =
          restriction === 'disabled' ? { disabled: true } : { [restriction]: ['alpha'] };
        render(
          <div onClickCapture={event => clicks.push(event.nativeEvent.isTrusted)}>
            <Component {...props} virtualized={virtualized} {...restricted} onChange={onChange} />
          </div>
        );
        // Send the real pointer event even when Playwright sees aria-disabled on the row.
        await click(label(), true);
        expect(clicks).to.deep.equal([true]);
        expect(onChange).not.toHaveBeenCalled();
        expect(row()).to.have.attribute('aria-checked', 'false');
      }
    );
  });
});
