import { useRef, useImperativeHandle } from 'react';
import { Table, Checkbox, type TableInstance } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { RowIdentity, selectionName } from '../../components';
import { toggleKey } from '../../domain';
import type { LedgerRow } from '../../types';
import type { VirtualAdapterProps } from '../types';
import { ROW_HEIGHT, BODY_HEIGHT, HEADER_HEIGHT } from '../domain';
export default function Adapter({ rows, selected, onSelected, actionsRef }: VirtualAdapterProps) {
  const ref = useRef<TableInstance<LedgerRow, string>>(null);
  useImperativeHandle(actionsRef, () => ({
    jumpToIndex: index => ref.current?.scrollTop(index * ROW_HEIGHT)
  }));
  return (
    <Table<LedgerRow, string>
      ref={ref}
      data={rows}
      rowKey="id"
      virtualized
      width={720}
      height={BODY_HEIGHT + HEADER_HEIGHT}
      rowHeight={ROW_HEIGHT}
      headerHeight={HEADER_HEIGHT}
    >
      {({ Column, HeaderCell, Cell }) => (
        <>
          <Column width={200}>
            <HeaderCell>Select</HeaderCell>
            <Cell>
              {row => (
                <Checkbox
                  aria-label={selectionName(row)}
                  checked={selected.includes(row.id)}
                  onChange={(_, checked) => onSelected(toggleKey(selected, row.id, checked))}
                >
                  {selectionName(row)}
                </Checkbox>
              )}
            </Cell>
          </Column>
          <Column width={320}>
            <HeaderCell>Name</HeaderCell>
            <Cell>{row => <RowIdentity row={row} />}</Cell>
          </Column>
          <Column width={200}>
            <HeaderCell>Amount</HeaderCell>
            <Cell dataKey="amount" />
          </Column>
        </>
      )}
    </Table>
  );
}
