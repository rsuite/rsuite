import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import TreePicker from '..';
import '../styles/index.scss';

async function key(name: string) {
  await act(async () => {
    await userEvent.keyboard(`{${name}}`);
  });
}

async function open(onEntered: ReturnType<typeof vi.fn>, count: number) {
  await act(async () => {
    await userEvent.click(screen.getByRole('combobox'));
  });
  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(count));
}

async function expectFocused(label: string) {
  await waitFor(() => {
    const row = screen.getByRole('treeitem', { name: label });
    expect(row).to.have.focus;
    const id = screen.getByRole('combobox').getAttribute('aria-activedescendant');
    expect(id).to.equal(row.id);
    expect(document.getElementById(id!)).to.equal(row);
  });
}

describe.each([false, true])('TreePicker typed row IDs virtual=%s', virtualized => {
  it.each(
    [false, true].flatMap(customKeys => [false, true].map(reopen => ({ customKeys, reopen })))
  )(
    'preserves raw number/string selection custom=$customKeys reopen=$reopen',
    async ({ customKeys, reopen }) => {
      const valueKey = customKeys ? 'nodeId' : 'value';
      const labelKey = customKeys ? 'title' : 'label';
      const childrenKey = customKeys ? 'branches' : 'children';
      const position = virtualized ? 700 : 1;
      const data = Array.from({ length: virtualized ? 1000 : 5 }, (_, index) => ({
        [labelKey]:
          index === 0
            ? 'Anchor'
            : index === position
              ? 'Numeric zero'
              : index === position + 1
                ? 'String zero'
                : index === position + 2
                  ? 'Prefixed string'
                  : `Row ${index}`,
        [valueKey]:
          index === 0
            ? 'anchor'
            : index === position
              ? 0
              : index === position + 1
                ? '0'
                : index === position + 2
                  ? 'Number_0'
                  : `row-${index}`
      }));
      const disabledItemValues = virtualized
        ? data.slice(1, position).map(node => String(node[valueKey]))
        : [];
      const onChange = vi.fn();
      const onEntered = vi.fn();
      const keys: KeyboardEvent[] = [];
      const capture = (event: KeyboardEvent) => keys.push(event);
      render(
        <TreePicker
          id="author-tree"
          data={data}
          defaultValue="anchor"
          searchable={false}
          valueKey={valueKey}
          labelKey={labelKey}
          childrenKey={childrenKey}
          virtualized={virtualized}
          disabledItemValues={disabledItemValues}
          treeHeight={180}
          listProps={{ height: 180, itemSize: 36 }}
          onChange={onChange}
          onEntered={onEntered}
        />
      );
      await open(onEntered, 1);
      await expectFocused('Anchor');
      expect(screen.getByRole('combobox')).to.have.attribute('id', 'author-tree');
      document.addEventListener('keydown', capture, true);
      try {
        await key('ArrowDown');
        await expectFocused('Numeric zero');
        if (reopen) {
          await key('Enter');
          await waitFor(() => expect(screen.queryByRole('tree')).to.be.null);
          expect(onChange.mock.calls[0][0]).to.equal(0);
          expect(typeof onChange.mock.calls[0][0]).to.equal('number');
          await open(onEntered, 2);
          await expectFocused('Numeric zero');
        }
        await key('ArrowDown');
        await expectFocused('String zero');
        const rows = screen.getAllByRole('treeitem');
        const ids = rows.map(row => row.id);
        expect(new Set(ids).size).to.equal(ids.length);
        expect(screen.getByRole('treeitem', { name: 'Numeric zero' }).dataset.key).to.equal(
          'Number_0'
        );
        expect(screen.getByRole('treeitem', { name: 'String zero' }).dataset.key).to.equal(
          'String_0'
        );
        expect(screen.getByRole('treeitem', { name: 'Prefixed string' }).id).not.to.equal(
          screen.getByRole('treeitem', { name: 'Numeric zero' }).id
        );
        await key('Enter');
        expect(onChange).toHaveBeenCalledTimes(reopen ? 2 : 1);
        expect(onChange.mock.calls.at(-1)![0]).to.equal('0');
        expect(typeof onChange.mock.calls.at(-1)![0]).to.equal('string');
        expect(onChange.mock.calls.every(call => call[1].nativeEvent.isTrusted)).to.be.true;
        expect(keys).to.have.length(reopen ? 4 : 3);
        expect(keys.every(event => event.isTrusted)).to.be.true;
      } finally {
        document.removeEventListener('keydown', capture, true);
      }
    }
  );

  it('keeps a string-only selection control linked to its actual row', async () => {
    const onChange = vi.fn();
    const onEntered = vi.fn();
    render(
      <TreePicker
        id="author-tree"
        data={[
          { label: 'First', value: 'first' },
          { label: 'Second', value: 'second' }
        ]}
        searchable={false}
        virtualized={virtualized}
        onChange={onChange}
        onEntered={onEntered}
      />
    );
    await open(onEntered, 1);
    await key('ArrowDown');
    await expectFocused('First');
    await key('ArrowDown');
    await expectFocused('Second');
    await key('Enter');
    expect(onChange).toHaveBeenCalledExactlyOnceWith('second', expect.anything());
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
  });
});
