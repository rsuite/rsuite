import { Table } from 'antd';
import { RowIdentity, selectionName } from '../../components';
import type { TreeAdapterProps, TreeRow } from '../types';
export default function Adapter({ rows, selected, onSelected }: TreeAdapterProps) {
  return (
    <Table<TreeRow>
      dataSource={rows}
      rowKey="id"
      pagination={false}
      expandable={{ defaultExpandedRowKeys: [] }}
      rowSelection={{
        selectedRowKeys: selected,
        preserveSelectedRowKeys: true,
        checkStrictly: true,
        onChange: keys => onSelected(keys.map(String)),
        getCheckboxProps: row => ({ 'aria-label': selectionName(row) })
      }}
      columns={[
        {
          key: 'entry',
          dataIndex: 'name',
          title: 'Entry',
          render: (_, row) => <RowIdentity row={row} />
        },
        { key: 'amount', dataIndex: 'amount', title: 'Amount' }
      ]}
    />
  );
}
