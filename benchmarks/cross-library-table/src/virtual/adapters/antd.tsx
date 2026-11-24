import { useRef, useCallback, useImperativeHandle } from 'react';
import { useVirtualCheckboxFocus } from '../hooks/useVirtualCheckboxFocus';
import { Table, ConfigProvider } from 'antd';
import type { TableRef } from 'antd/es/table';
import { RowIdentity } from '../../components';
import type { VirtualAdapterProps } from '../types';
import { BODY_HEIGHT, ROW_HEIGHT } from '../domain';
const fontSize = 14;
const lineHeight = 1.5;
const lineWidth = 1;
const paddingBlock = (ROW_HEIGHT - Math.floor(fontSize * lineHeight) - lineWidth) / 2;
// The native virtualizer estimate uses global padding, while cells use the Table token.
const geometryTheme = {
  token: { fontSize, lineHeight, lineWidth, padding: paddingBlock },
  components: { Table: { cellPaddingBlock: paddingBlock, cellPaddingInline: 16 } }
};
export default function Adapter({ rows, selected, onSelected, actionsRef }: VirtualAdapterProps) {
  const ref = useRef<TableRef>(null);
  const scrollToIndex = useCallback((index: number, align: 'start' | 'auto') => {
    ref.current?.scrollTo(align === 'start' ? { top: index * ROW_HEIGHT } : { index });
  }, []);
  const focus = useVirtualCheckboxFocus(rows, scrollToIndex);
  useImperativeHandle(actionsRef, () => ({ jumpToIndex: focus.jumpToIndex }), [focus.jumpToIndex]);
  return (
    <ConfigProvider theme={geometryTheme}>
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
            {
              key: 'name',
              title: 'Name',
              width: 320,
              render: (_, row) => <RowIdentity row={row} />
            },
            { key: 'amount', dataIndex: 'amount', title: 'Amount', width: 200 }
          ]}
        />
      </div>
    </ConfigProvider>
  );
}
