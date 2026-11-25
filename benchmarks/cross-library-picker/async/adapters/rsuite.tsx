import React from 'react';
import SelectPicker from 'rsuite/SelectPicker';
import 'rsuite/dist/rsuite.min.css';
import type { AsyncAdapterProps } from '../types';
import { listHeight, rowHeight, OptionLabel } from '../../src/shared';
export default function Adapter({
  items,
  value,
  virtualized,
  onQuery,
  onSelectionChange
}: AsyncAdapterProps) {
  return (
    <SelectPicker
      aria-label="Items"
      data={items}
      value={value}
      virtualized={virtualized}
      searchable
      responsive={false}
      placement="bottomStart"
      listboxMaxHeight={listHeight}
      listProps={{ itemSize: rowHeight, overscanCount: 2 }}
      style={{ width: 240 }}
      popupClassName="benchmark-popup"
      searchBy={() => true}
      onSearch={onQuery}
      disabledItemValues={items.filter(item => item.disabled).map(item => item.value)}
      renderOption={(_, item) => <OptionLabel item={item as (typeof items)[number]} />}
      locale={{ noResultsText: 'No results' }}
      onChange={next => onSelectionChange(next === null ? null : String(next))}
    />
  );
}
