import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Calendar from '../../Calendar';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';
import DateRangeInput from '../DateRangeInput';

const range: [Date, Date] = [new Date(2024, 0, 2), new Date(2024, 0, 4)];

describe('DateRangeInput provider defaults', () => {
  it('applies its own input and range defaults', () => {
    render(
      <CustomProvider
        components={{
          DateRangeInput: {
            defaultProps: {
              id: 'range-default',
              className: 'range-default',
              size: 'lg',
              format: 'yyyy/MM/dd',
              character: ' to ',
              placeholder: 'Select a range'
            }
          }
        }}
      >
        <DateRangeInput value={range} />
      </CustomProvider>
    );

    const input = screen.getByRole('textbox');
    expect(input).to.have.attribute('id', 'range-default');
    expect(input).to.have.class('range-default');
    expect(input).to.have.attribute('data-size', 'lg');
    expect(input).to.have.attribute('placeholder', 'Select a range');
    expect(input).to.have.value('2024/01/02 to 2024/01/04');
  });

  it('keeps Calendar defaults on Calendar', () => {
    render(
      <CustomProvider
        components={{
          Calendar: { defaultProps: { className: 'calendar-default' } }
        }}
      >
        <Calendar compact data-testid="calendar" />
        <DateRangeInput />
      </CustomProvider>
    );

    expect(screen.getByTestId('calendar')).to.have.class('calendar-default');
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('calendar-default')).toBe(false);
    expect(input.hasAttribute('locale')).toBe(false);
  });

  it('lets instance props override provider defaults', () => {
    render(
      <CustomProvider
        components={{
          DateRangeInput: {
            defaultProps: {
              id: 'range-default',
              size: 'lg',
              format: 'yyyy/MM/dd',
              character: ' to ',
              placeholder: 'Global placeholder'
            }
          }
        }}
      >
        <DateRangeInput
          id="range-instance"
          size="sm"
          format="yyyy-MM-dd"
          character=" / "
          placeholder="Instance placeholder"
          value={range}
        />
      </CustomProvider>
    );

    const input = screen.getByRole('textbox');
    expect(input).to.have.attribute('id', 'range-instance');
    expect(input).to.have.attribute('data-size', 'sm');
    expect(input).to.have.attribute('placeholder', 'Instance placeholder');
    expect(input).to.have.value('2024-01-02 / 2024-01-04');
  });

  it('updates the range when provider defaults change', () => {
    const { rerender } = render(
      <CustomProvider
        components={{
          DateRangeInput: { defaultProps: { format: 'yyyy/MM/dd', character: ' to ' } }
        }}
      >
        <DateRangeInput value={range} />
      </CustomProvider>
    );
    expect(screen.getByRole('textbox')).to.have.value('2024/01/02 to 2024/01/04');

    rerender(
      <CustomProvider
        components={{
          DateRangeInput: { defaultProps: { format: 'dd.MM.yyyy', character: ' — ' } }
        }}
      >
        <DateRangeInput value={range} />
      </CustomProvider>
    );
    expect(screen.getByRole('textbox')).to.have.value('02.01.2024 — 04.01.2024');
  });

  it('preserves provider date locales and Input defaults', () => {
    render(
      <CustomProvider
        locale={zhCN}
        components={{
          Input: { defaultProps: { size: 'xs' } },
          DateRangeInput: { defaultProps: { character: ' to ' } }
        }}
      >
        <DateRangeInput value={range} />
      </CustomProvider>
    );

    const input = screen.getByRole('textbox');
    expect(input).to.have.attribute('data-size', 'xs');
    expect(input).to.have.value('2024-01-02 to 2024-01-04');
  });

  it('uses the provider change callback unless the instance supplies one', () => {
    const globalChange = vi.fn();
    const localChange = vi.fn();
    const defaults = { defaultProps: { onChange: globalChange, format: 'yyyy-MM-dd' } };
    const { rerender } = render(
      <CustomProvider components={{ DateRangeInput: defaults }}>
        <DateRangeInput defaultValue={range} />
      </CustomProvider>
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.focus(input);
    input.setSelectionRange(0, 4);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(globalChange).toHaveBeenCalledTimes(1);
    expect(globalChange.mock.calls[0][0]).toEqual([new Date(2023, 0, 2), range[1]]);

    rerender(
      <CustomProvider components={{ DateRangeInput: defaults }}>
        <DateRangeInput defaultValue={range} onChange={localChange} />
      </CustomProvider>
    );
    input.setSelectionRange(0, 4);
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(localChange).toHaveBeenCalledTimes(1);
    expect(localChange.mock.calls[0][0]).toEqual(range);
    expect(globalChange).toHaveBeenCalledTimes(1);
  });
});
