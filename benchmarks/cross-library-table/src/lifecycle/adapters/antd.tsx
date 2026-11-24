import { Table } from 'antd';
import { RowIdentity } from '../../components';
import { LoadingIndicator, EmptyIndicator } from '../components';
import type { LifecycleAdapterProps } from '../types';
export default function Adapter({ rows, loading, selected, onSelected }: LifecycleAdapterProps) {
  return (
    <Table
      rowKey="id"
      dataSource={loading ? undefined : rows}
      pagination={false}
      style={{ width: 720 }}
      loading={{ spinning: loading, indicator: <LoadingIndicator /> }}
      locale={{ emptyText: <EmptyIndicator /> }}
      rowSelection={{
        selectedRowKeys: selected,
        preserveSelectedRowKeys: true,
        onChange: keys => onSelected(keys.map(String)),
        columnWidth: 200
      }}
      columns={[
        { key: 'name', title: 'Entry', width: 320, render: (_, row) => <RowIdentity row={row} /> },
        { key: 'amount', title: 'Amount', dataIndex: 'amount', width: 200 }
      ]}
    />
  );
}
