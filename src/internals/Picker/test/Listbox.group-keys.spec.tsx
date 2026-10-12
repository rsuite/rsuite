import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Listbox from '../Listbox';
import ListItem from '../ListItem';
import { getDataGroupBy } from '@/internals/utils';
import { RSUITE_PICKER_GROUP_KEY } from '@/internals/symbols';

const cases = [
  ['string', 'Owners'],
  ['positive number', 1],
  ['negative number', -1],
  ['zero', 0],
  ['false', false],
  ['true', true],
  ['empty string', ''],
  ['null', null],
  ['undefined', undefined],
  ['NaN', NaN]
] as const;

describe.each([false, true])('Listbox group keys (virtualized=%s)', virtualized => {
  it.each(cases)(
    'Should collapse and expand a %s group without affecting other groups',
    (_, group) => {
      const items = Object.freeze([
        Object.freeze({ value: 'first', label: 'First', meta: { group } }),
        Object.freeze({ value: 'second', label: 'Second', meta: { group } }),
        Object.freeze({ value: 'other', label: 'Other', meta: { group: 'Other group' } })
      ]);
      const onSelect = vi.fn();
      render(
        <Listbox
          data={getDataGroupBy(items, 'meta.group')}
          groupBy="meta.group"
          virtualized={virtualized}
          listItemAs={ListItem}
          onSelect={onSelect}
          renderOptionGroup={title => `Group: ${title || '(empty)'}`}
        />
      );
      const title = screen.getByText(`Group: ${String(group) || '(empty)'}`);
      for (let cycle = 0; cycle < 2; cycle++) {
        expect(screen.getAllByRole('option')).toHaveLength(3);
        fireEvent.click(title);
        expect(screen.queryByRole('option', { name: 'First' })).toBeNull();
        expect(screen.queryByRole('option', { name: 'Second' })).toBeNull();
        expect(screen.getAllByRole('option')).toHaveLength(1);
        expect(screen.getByRole('option', { name: 'Other' })).not.toBeNull();
        expect(screen.getAllByRole('group')).toHaveLength(2);
        fireEvent.click(title);
        expect(screen.getByRole('option', { name: 'First' })).not.toBeNull();
        expect(screen.getByRole('option', { name: 'Second' })).not.toBeNull();
      }
      expect(screen.getAllByRole('option')).toHaveLength(3);
      expect(onSelect).not.toHaveBeenCalled();
    }
  );

  it('Should collapse numeric and string fields that share the same displayed group', () => {
    const items = [
      { value: 'number', label: 'Number', group: 1 },
      { value: 'string', label: 'String', group: '1' },
      { value: 'other', label: 'Other', group: 2 }
    ];
    render(
      <Listbox
        data={getDataGroupBy(items, 'group')}
        groupBy="group"
        virtualized={virtualized}
        listItemAs={ListItem}
        renderOptionGroup={title => `Group: ${title}`}
      />
    );
    expect(screen.getAllByRole('group')).toHaveLength(2);
    fireEvent.click(screen.getByText('Group: 1'));
    expect(screen.queryByRole('option', { name: 'Number' })).toBeNull();
    expect(screen.queryByRole('option', { name: 'String' })).toBeNull();
    expect(screen.getAllByRole('option')).toHaveLength(1);
    fireEvent.click(screen.getByText('Group: 1'));
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('Should retain legacy parent group titles when the group field is absent', () => {
    const parent = { groupTitle: 'Legacy' };
    render(
      <Listbox
        data={[
          { [RSUITE_PICKER_GROUP_KEY]: true, groupTitle: 'Legacy' },
          { value: 'first', label: 'First', parent }
        ]}
        groupBy="missing"
        virtualized={virtualized}
        listItemAs={ListItem}
      />
    );
    expect(screen.getByRole('option', { name: 'First' })).not.toBeNull();
    fireEvent.click(screen.getByText('Legacy'));
    expect(screen.queryByRole('option', { name: 'First' })).toBeNull();
    fireEvent.click(screen.getByText('Legacy'));
    expect(screen.getByRole('option', { name: 'First' })).not.toBeNull();
  });
});
