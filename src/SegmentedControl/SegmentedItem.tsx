import React from 'react';
import { useStyles } from '@/internals/hooks';
import { SegmentedItemDataType } from './SegmentedControl';

export interface SegmentedItemProps {
  item: SegmentedItemDataType;
  index: number;
  name?: string;
  active: boolean;
  disabled?: boolean;
  classPrefix: string;
  onChange: (value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SegmentedItem = ({
  item,
  index,
  name,
  active,
  disabled,
  classPrefix,
  onChange
}: SegmentedItemProps) => {
  const { prefix } = useStyles(classPrefix);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(item.value, event);
  };

  return (
    <label
      className={prefix('item')}
      data-value={item.value}
      data-index={index}
      data-active={active || undefined}
      data-disabled={disabled || undefined}
    >
      <input
        type="radio"
        name={name}
        value={String(item.value)}
        checked={active}
        disabled={disabled}
        onChange={handleChange}
        className={prefix('radio')}
      />
      <span className={prefix('label')}>{item.label}</span>
    </label>
  );
};

SegmentedItem.displayName = 'SegmentedItem';

export default SegmentedItem;
