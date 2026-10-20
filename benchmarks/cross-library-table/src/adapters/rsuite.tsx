import Table from 'rsuite/Table';
import Checkbox from 'rsuite/Checkbox';
import 'rsuite/dist/rsuite.min.css';
import { RowIdentity, selectionName } from '../components';
import { ordered, toggleKey } from '../domain';
import type { AdapterProps } from '../types';
export default function Adapter(props: AdapterProps) {
  const { sort, rows, selected, onSelected, onSort } = props;
  return (
    <Table
      data={ordered(rows, sort)}
      rowKey="id"
      height={1100}
      width={840}
      sortColumn={sort ? 'amount' : undefined}
      sortType={sort?.direction === 'descending' ? 'desc' : 'asc'}
      defaultSortType="asc"
      onSortColumn={(_, direction) =>
        onSort({ direction: direction === 'desc' ? 'descending' : 'ascending' })
      }
    >
      {({ Column, Cell, HeaderCell }) => (
        <>
          <Column width={80}>
            <HeaderCell>Select</HeaderCell>
            <Cell>
              {row => (
                <Checkbox
                  aria-label={selectionName(row)}
                  disabled={row.disabled}
                  checked={selected.includes(row.id)}
                  onChange={(_, checked) => onSelected(toggleKey(selected, row.id, checked))}
                />
              )}
            </Cell>
          </Column>
          <Column width={260}>
            <HeaderCell>Entry</HeaderCell>
            <Cell>{row => <RowIdentity row={row} />}</Cell>
          </Column>
          <Column width={180} sortable>
            <HeaderCell aria-sort={sort?.direction ?? 'none'}>Amount</HeaderCell>
            <Cell dataKey="amount" />
          </Column>
        </>
      )}
    </Table>
  );
}
