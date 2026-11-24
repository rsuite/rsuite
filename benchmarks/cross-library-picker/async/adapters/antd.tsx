import React from 'react';
import { ConfigProvider, Select } from 'antd';
import type { AsyncAdapterProps } from '../types';
import { listHeight, rowHeight, OptionLabel, Empty } from '../../src/shared';
export default function Adapter({
  items,
  value,
  virtualized,
  onQuery,
  onSelectionChange
}: AsyncAdapterProps) {
  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: 'Arial, sans-serif' },
        components: {
          Select: { optionHeight: rowHeight, optionPadding: '0 12px' }
        }
      }}
    >
      <Select
        aria-label="Items"
        options={items}
        value={value}
        virtual={virtualized}
        showSearch={{ filterOption: false, onSearch: onQuery }}
        listHeight={listHeight}
        listItemHeight={rowHeight}
        style={{ width: 240 }}
        classNames={{ popup: { root: 'benchmark-popup' } }}
        optionRender={option => <OptionLabel item={option.data} />}
        notFoundContent={<Empty />}
        onChange={next => onSelectionChange(next === undefined ? null : next)}
      />
    </ConfigProvider>
  );
}
