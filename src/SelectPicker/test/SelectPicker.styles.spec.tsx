import React from 'react';
import SelectPicker from '../index';
import { describe, expect, it } from 'vitest';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import { toRGB } from '@test/utils';
import { testPickerSize } from '@test/cases';
import { mockGroupData } from '@test/mocks/data-mock';
import type { PickerHandle } from '../../internals/Picker/types';
import '../styles/index.scss';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('SelectPicker styles', () => {
  testPickerSize(SelectPicker);

  it('Default select picker should render correct toggle styles', () => {
    render(<SelectPicker data={[]} open />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#fff'));
    expect(screen.getByRole('combobox')).to.have.style('border-width', `1px`);
    expect(screen.getByRole('combobox')).to.have.style('padding', '8px 11px');

    const popup = screen.getByTestId('picker-popup');
    const noneElement = within(popup).getByText('No results found');

    expect(noneElement).to.have.style('padding', '12px');
  });

  it('Subtle select picker should render correct toggle styles', () => {
    render(<SelectPicker data={[]} appearance="subtle" />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#0000'));
    expect(screen.getByRole('combobox')).to.have.style('border-width', '0px');
    expect(screen.getByRole('combobox')).to.have.style('padding', '8px 12px');
  });

  it('Block select picker should render correct toggle styles', () => {
    const { container } = render(<SelectPicker block data={data} />);

    expect(container.firstChild).to.have.style('display', 'block');
  });

  it('Select picker group should render correct styles', () => {
    const data = [
      {
        label: 'Eugenia',
        value: 'Eugenia',
        role: 'Master'
      },
      {
        label: 'Kariane',
        value: 'Kariane',
        role: 'Developer'
      },
      {
        label: 'Louisa',
        value: 'Louisa',
        role: 'Master'
      }
    ];

    render(<SelectPicker groupBy="role" data={data} open />);

    const groups = screen.getAllByRole('group');

    expect(groups[1]).to.have.style('border-top', `1px solid ${toRGB('#e5e5ea')}`);
    expect(groups[1]).to.have.style('margin-top', '6px');
  });

  it.each(['ltr', 'rtl'] as const)(
    'keeps group indentation after a virtual group header unmounts in %s',
    async direction => {
      const previousDirection = document.documentElement.dir;
      document.documentElement.dir = direction;
      try {
        const ref = React.createRef<PickerHandle>();
        render(
          <SelectPicker
            ref={ref}
            data={Array.from({ length: 200 }, (_, index) => ({
              label: `Item ${index + 1}`,
              value: index + 1,
              group: 'Team'
            }))}
            groupBy="group"
            open
            virtualized
            listboxMaxHeight={180}
            listProps={{ overscanCount: 0 }}
          />
        );
        expect(getComputedStyle(screen.getByText('Item 1')).paddingInlineStart).toBe('26px');
        act(() => ref.current?.list?.scrollToItem?.(80));
        await waitFor(() => {
          expect(screen.queryByRole('group')).toBeNull();
          const option = screen.getByText('Item 80');
          expect(getComputedStyle(option).paddingInlineStart).toBe('26px');
          expect(getComputedStyle(option).direction).toBe(direction);
        });
      } finally {
        document.documentElement.dir = previousDirection;
      }
    }
  );

  it.each(['ltr', 'rtl'] as const)(
    'does not indent an ungrouped picker nested in a grouped menu in %s',
    direction => {
      const previousDirection = document.documentElement.dir;
      document.documentElement.dir = direction;
      try {
        render(
          <SelectPicker
            data={[{ label: 'Outer item', value: 1, group: 'Team' }]}
            groupBy="group"
            open
          />
        );
        const outerMenu = screen.getByRole('listbox');
        render(
          <SelectPicker data={[{ label: 'Inner item', value: 2 }]} container={outerMenu} open />
        );
        expect(getComputedStyle(screen.getByText('Outer item')).paddingInlineStart).toBe('26px');
        expect(getComputedStyle(screen.getByText('Inner item')).paddingInlineStart).toBe('12px');
      } finally {
        document.documentElement.dir = previousDirection;
      }
    }
  );

  it.each(['ltr', 'rtl'] as const)(
    'updates ordinary option indentation when grouping changes in %s',
    direction => {
      const previousDirection = document.documentElement.dir;
      document.documentElement.dir = direction;
      try {
        const items = [{ label: 'Item', value: 1, group: 'Team' }];
        const { rerender } = render(<SelectPicker data={items} open />);
        const padding = () => getComputedStyle(screen.getByText('Item')).paddingInlineStart;
        expect(padding()).toBe('12px');
        rerender(<SelectPicker data={items} groupBy="group" open />);
        expect(padding()).toBe('26px');
        rerender(<SelectPicker data={items} open />);
        expect(padding()).toBe('12px');
      } finally {
        document.documentElement.dir = previousDirection;
      }
    }
  );

  it.each([
    ['ltr', false],
    ['ltr', true],
    ['rtl', false],
    ['rtl', true]
  ] as const)(
    'treats empty groupBy as ungrouped in %s with virtualized=%s',
    async (direction, virtualized) => {
      const previousDirection = document.documentElement.dir;
      document.documentElement.dir = direction;
      try {
        const items = Array.from({ length: 3 }, (_, index) => ({
          label: `Item ${index + 1}`,
          value: index + 1,
          group: 'Team'
        }));
        const picker = (groupBy: string) => (
          <SelectPicker data={items} groupBy={groupBy} virtualized={virtualized} open />
        );
        const { rerender } = render(picker(''));
        const padding = () => getComputedStyle(screen.getByText('Item 1')).paddingInlineStart;
        await waitFor(() => expect(padding()).toBe('12px'));
        expect(screen.queryByRole('group')).toBeNull();
        expect(screen.getByRole('option', { name: 'Item 1' })).not.to.have.attribute(
          'data-grouped'
        );

        rerender(picker('group'));
        await waitFor(() => expect(padding()).toBe('26px'));
        expect(screen.getAllByRole('group')).toHaveLength(1);

        rerender(picker(''));
        await waitFor(() => expect(padding()).toBe('12px'));
        expect(screen.queryByRole('group')).toBeNull();
        expect(screen.getByRole('option', { name: 'Item 1' })).not.to.have.attribute(
          'data-grouped'
        );
      } finally {
        document.documentElement.dir = previousDirection;
      }
    }
  );

  it('Disabled select picker should render correct toggle styles', () => {
    const { rerender } = render(<SelectPicker data={[]} disabled />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#f7f7fa'));

    rerender(<SelectPicker data={[]} appearance="subtle" disabled />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#0000'));
  });
});
