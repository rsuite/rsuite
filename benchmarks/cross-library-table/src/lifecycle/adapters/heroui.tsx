import { Table, Checkbox } from '@heroui/react';
import { RowIdentity, selectionName } from '../../components';
import { LoadingIndicator, EmptyIndicator } from '../components';
import type { LifecycleAdapterProps } from '../types';
import '../../heroui.css';
export default function Adapter({ rows, loading, selected, onSelected }: LifecycleAdapterProps) {
  return (
    <Table style={{ width: 720 }}>
      <Table.Content
        aria-label="Lifecycle ledger entries"
        selectionMode="multiple"
        selectedKeys={new Set(selected)}
        onSelectionChange={keys =>
          onSelected(keys === 'all' ? rows.map(row => row.id) : [...keys].map(String))
        }
      >
        <Table.Header>
          <Table.Column id="selection">Select</Table.Column>
          <Table.Column id="name" isRowHeader>
            Entry
          </Table.Column>
          <Table.Column id="amount">Amount</Table.Column>
        </Table.Header>
        <Table.Body
          items={rows}
          renderEmptyState={() => (loading ? <LoadingIndicator /> : <EmptyIndicator />)}
        >
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
