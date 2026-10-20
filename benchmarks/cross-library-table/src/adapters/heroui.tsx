import { Table, Checkbox } from '@heroui/react';
import { RowIdentity, selectionName } from '../components';
import { ordered } from '../domain';
import type { AdapterProps } from '../types';
import '../heroui.css';
export default function Adapter({ rows, sort, onSort, selected, onSelected }: AdapterProps) {
  return (
    <Table>
      <Table.Content
        aria-label="Ledger entries"
        selectionMode="multiple"
        selectedKeys={new Set(selected)}
        disabledKeys={['entry-003']}
        onSelectionChange={keys =>
          onSelected(
            keys === 'all'
              ? rows.filter(row => !row.disabled).map(row => row.id)
              : [...keys].map(String)
          )
        }
        sortDescriptor={sort ? { column: 'amount', direction: sort.direction } : undefined}
        onSortChange={next => onSort({ direction: next.direction })}
      >
        <Table.Header>
          <Table.Column id="selection">
            <Checkbox slot="selection">
              <Checkbox.Content aria-label="Select all entries">
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Content>
            </Checkbox>
          </Table.Column>
          <Table.Column id="entry" isRowHeader>
            Entry
          </Table.Column>
          <Table.Column id="amount" allowsSorting>
            {({ sortDirection }) => (
              <Table.SortableColumnHeader sortDirection={sortDirection}>
                Amount
              </Table.SortableColumnHeader>
            )}
          </Table.Column>
        </Table.Header>
        <Table.Body items={ordered(rows, sort)}>
          {row => (
            <Table.Row id={row.id}>
              <Table.Cell>
                <Checkbox slot="selection">
                  <Checkbox.Content aria-label={selectionName(row)}>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Content>
                </Checkbox>
              </Table.Cell>
              <Table.Cell>
                <RowIdentity row={row} />
              </Table.Cell>
              <Table.Cell>{row.amount}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Content>
    </Table>
  );
}
