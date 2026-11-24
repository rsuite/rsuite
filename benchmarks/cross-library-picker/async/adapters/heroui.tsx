import React from 'react';
import { ComboBox, Input, ListBox } from '@heroui/react';
import { Virtualizer, ListLayout } from 'react-aria-components/Virtualizer';
import type { AsyncAdapterProps } from '../types';
import { listHeight, rowHeight, OptionLabel, Empty } from '../../src/shared';
import '../../src/adapters/heroui.css';
export default function Adapter({
  items,
  value,
  virtualized,
  onQuery,
  onSelectionChange
}: AsyncAdapterProps) {
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
      items={items}
      selectedKey={value}
      aria-label="Items"
      menuTrigger="manual"
      allowsEmptyCollection
      disabledKeys={items.filter(item => item.disabled).map(item => item.value)}
      onInputChange={onQuery}
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
