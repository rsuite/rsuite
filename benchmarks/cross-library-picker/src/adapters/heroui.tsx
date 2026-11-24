import React from 'react';
import { ComboBox, Input, ListBox } from '@heroui/react';
import { Virtualizer, ListLayout } from 'react-aria-components/Virtualizer';
import type { AdapterProps } from '../protocol';
import { listHeight, rowHeight, OptionLabel, Empty, contains } from '../shared';
import 'benchmark-library-styles';

export default function HerouiAdapter({ items, virtualized, onSelectionChange }: AdapterProps) {
  const list = (
    <ListBox
      items={items}
      aria-label="Items"
      renderEmptyState={() => <Empty />}
      style={{ maxHeight: listHeight, overflowY: 'auto', padding: 0, display: 'block' }}
    >
      {item => (
        <ListBox.Item
          id={item.value}
          textValue={item.label}
          style={{ height: rowHeight, minHeight: rowHeight, paddingBlock: 0, marginBlock: 0 }}
        >
          <OptionLabel item={item} />
        </ListBox.Item>
      )}
    </ListBox>
  );
  return (
    <ComboBox
      aria-label="Items"
      defaultFilter={contains}
      menuTrigger="manual"
      allowsEmptyCollection
      onSelectionChange={key => onSelectionChange(key === null ? null : String(key))}
    >
      <ComboBox.InputGroup>
        <Input aria-label="Items" />
        <ComboBox.Trigger aria-label="Open items" />
      </ComboBox.InputGroup>
      <ComboBox.Popover className="benchmark-popup" placement="bottom start">
        {virtualized ? (
          <Virtualizer layout={ListLayout} layoutOptions={{ rowSize: rowHeight }}>
            {list}
          </Virtualizer>
        ) : (
          list
        )}
      </ComboBox.Popover>
    </ComboBox>
  );
}
