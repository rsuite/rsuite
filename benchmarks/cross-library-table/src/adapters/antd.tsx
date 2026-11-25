import { Table } from 'antd';
import { RowIdentity, selectionName } from '../components';
import { compareRows } from '../domain';
import type { AdapterProps, LedgerRow } from '../types';
export default function Adapter({ rows, sort, onSort, selected, onSelected }: AdapterProps) {
  return (
    <Table<LedgerRow>
      dataSource={rows}
      rowKey="id"
      pagination={false}
      rowSelection={{
        selectedRowKeys: selected,
        preserveSelectedRowKeys: true,
        onChange: keys => onSelected(keys.map(String)),
        getCheckboxProps: row => ({ disabled: row.disabled, 'aria-label': selectionName(row) })
      }}
      columns={[
        { key: 'entry', title: 'Entry', render: (_, row) => <RowIdentity row={row} /> },
        {
          key: 'amount',
          dataIndex: 'amount',
          title: 'Amount',
          sorter: compareRows,
          sortOrder: sort ? (sort.direction === 'ascending' ? 'ascend' : 'descend') : null,
          sortDirections: ['ascend', 'descend']
        }
      ]}
      onChange={(_, __, sorter) => {
        const next = Array.isArray(sorter) ? sorter[0] : sorter;
        if (next?.order)
          onSort({ direction: next.order === 'ascend' ? 'ascending' : 'descending' });
      }}
    />
  );
}
