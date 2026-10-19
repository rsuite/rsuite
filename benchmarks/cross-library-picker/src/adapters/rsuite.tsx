import React from 'react';
import SelectPicker from 'rsuite/SelectPicker';
import 'rsuite/dist/rsuite.min.css';
import type { AdapterProps, Item } from '../protocol';
import { listHeight, rowHeight, OptionLabel, contains } from '../shared';

export default function RsuiteAdapter({ items, virtualized, onSelectionChange }: AdapterProps) {
  return (
    <SelectPicker
      aria-label="Items"
      data={items}
      virtualized={virtualized}
      searchable
      responsive={false}
      placement="bottomStart"
      listboxMaxHeight={listHeight}
      listProps={{ itemSize: rowHeight, overscanCount: 2 }}
      style={{ width: 240 }}
      popupClassName="benchmark-popup"
      searchBy={(query, label) => contains(String(label), query)}
      renderOption={(_, item) => <OptionLabel item={item as Item} />}
      locale={{ noResultsText: 'No results' }}
      onChange={value => onSelectionChange(value === null ? null : String(value))}
    />
  );
}
