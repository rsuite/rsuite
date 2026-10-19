import React from 'react';
import { ConfigProvider, Select } from 'antd';
import type { AdapterProps } from '../protocol';
import { listHeight, rowHeight, OptionLabel, Empty, contains } from '../shared';

export default function AntdAdapter({ items, virtualized, onSelectionChange }: AdapterProps) {
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
        virtual={virtualized}
        showSearch={{ filterOption: (query, option) => contains(String(option?.label), query) }}
        listHeight={listHeight}
        listItemHeight={rowHeight}
        style={{ width: 240 }}
        classNames={{ popup: { root: 'benchmark-popup' } }}
        optionRender={option => <OptionLabel item={option.data} />}
        notFoundContent={<Empty />}
        onChange={value => onSelectionChange(value === undefined ? null : value)}
      />
    </ConfigProvider>
  );
}
