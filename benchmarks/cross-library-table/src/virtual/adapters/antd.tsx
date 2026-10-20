import { useRef, useCallback, useImperativeHandle } from 'react';
import { useVirtualCheckboxFocus } from '../hooks/useVirtualCheckboxFocus';
import { Table } from 'antd';
import type { TableRef } from 'antd/es/table';
import { RowIdentity } from '../../components';
import type { VirtualAdapterProps } from '../types';
import { BODY_HEIGHT, ROW_HEIGHT } from '../domain';
export default function Adapter({ rows, selected, onSelected, actionsRef }: VirtualAdapterProps) {
  const ref = useRef<TableRef>(null);
  const scrollToIndex = useCallback((index: number) => ref.current?.scrollTo({ index }), []);
  const focus = useVirtualCheckboxFocus(rows, scrollToIndex);
  useImperativeHandle(actionsRef, () => ({ jumpToIndex: focus.jumpToIndex }), [focus.jumpToIndex]);
  return (
    <div ref={focus.viewportRef}>
      <Table
        ref={ref}
        virtual
        onRow={row => ({ style: { height: ROW_HEIGHT }, 'data-virtual-row-id': row.id })}
        rowKey="id"
        dataSource={rows}
        pagination={false}
        scroll={{ x: 720, y: BODY_HEIGHT }}
        style={{ width: 720 }}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: keys => onSelected(keys.map(String)),
          preserveSelectedRowKeys: true,
          getCheckboxProps: row => focus.getInputProps(row),
          columnWidth: 200
        }}
        columns={[
          { key: 'name', title: 'Name', width: 320, render: (_, row) => <RowIdentity row={row} /> },
          { key: 'amount', dataIndex: 'amount', title: 'Amount', width: 200 }
        ]}
      />
    </div>
  );
}
