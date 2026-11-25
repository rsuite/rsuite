import React from 'react';
import ScrollView from '@/internals/ScrollView';
import useTimeKeyboard, { type TimeOption } from './useTimeKeyboard';

interface TimeColumnProps<T> {
  prefix: (name: string, states?: Record<string, boolean | undefined>) => string;
  title: React.ReactNode;
  type: string;
  options: TimeOption<T>[];
  onSelect: (value: T, event: React.SyntheticEvent) => void;
}

const TimeColumn = <T extends string | number>(props: TimeColumnProps<T>) => {
  const { prefix, title, type, options, onSelect, ...rest } = props;
  const { activeValue, ...keyboard } = useTimeKeyboard(options, onSelect);
  return (
    <div className={prefix('column')}>
      <div className={prefix('column-title')}>{title}</div>
      <ScrollView
        customScrollbar
        as="ul"
        role="listbox"
        data-type={type}
        aria-disabled={activeValue === undefined || undefined}
        tabIndex={activeValue === undefined ? 0 : -1}
        {...keyboard}
        {...rest}
      >
        {options.map(option => (
          <li
            key={option.value}
            role="option"
            tabIndex={option.value === activeValue ? 0 : -1}
            aria-label={option.ariaLabel}
            aria-selected={option.selected}
            aria-disabled={option.disabled}
            data-key={`${type}-${option.value}`}
            data-value={option.value}
            onClick={!option.disabled ? event => onSelect(option.value, event) : undefined}
          >
            <span
              className={prefix('cell', {
                'cell-active': option.selected,
                'cell-disabled': option.disabled
              })}
            >
              {option.label}
            </span>
          </li>
        ))}
      </ScrollView>
    </div>
  );
};

export default TimeColumn;
