import Table from 'rsuite/Table';
import Checkbox from 'rsuite/Checkbox';
import 'rsuite/dist/rsuite.min.css';
import { RowIdentity, selectionName } from '../../components';
import { toggleKey } from '../../domain';
import { LoadingIndicator, EmptyIndicator } from '../components';
import type { LifecycleAdapterProps } from '../types';
export default function Adapter({ rows, loading, selected, onSelected }: LifecycleAdapterProps) {
  return (
    <Table
      data={rows}
      rowKey="id"
      width={720}
      height={260}
      loading={loading}
      renderLoading={() => <LoadingIndicator />}
      renderEmpty={() => <EmptyIndicator />}
    >
      {({ Column, Cell, HeaderCell }) => (
        <>
          <Column width={200}>
            <HeaderCell>Select</HeaderCell>
            <Cell>
              {row => (
                <Checkbox
                  aria-label={selectionName(row)}
                  checked={selected.includes(row.id)}
                  onChange={(_, checked) => onSelected(toggleKey(selected, row.id, checked))}
                />
              )}
            </Cell>
          </Column>
          <Column width={320}>
            <HeaderCell>Entry</HeaderCell>
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
