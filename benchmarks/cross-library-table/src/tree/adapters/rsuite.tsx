import Table from 'rsuite/Table';
import Checkbox from 'rsuite/Checkbox';
import 'rsuite/dist/rsuite.min.css';
import { RowIdentity, selectionName } from '../../components';
import { toggleKey } from '../../domain';
import type { TreeAdapterProps, TreeRow } from '../types';
export default function Adapter({ rows, selected, onSelected }: TreeAdapterProps) {
  return (
    <Table<TreeRow, string>
      data={rows}
      rowKey="id"
      isTree
      defaultExpandedRowKeys={[]}
      height={600}
      width={840}
    >
      {({ Column, Cell, HeaderCell }) => (
        <>
          <Column width={420} treeCol>
            <HeaderCell>Entry</HeaderCell>
            <Cell dataKey="name">{row => <RowIdentity row={row} />}</Cell>
          </Column>
          <Column width={120}>
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
          <Column width={160}>
            <HeaderCell>Amount</HeaderCell>
            <Cell dataKey="amount" />
          </Column>
        </>
      )}
    </Table>
  );
}
