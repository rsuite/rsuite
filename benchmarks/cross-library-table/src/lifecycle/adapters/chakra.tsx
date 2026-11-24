import { ChakraProvider, defaultSystem, Table, Checkbox } from '@chakra-ui/react';
import { RowIdentity, selectionName } from '../../components';
import { toggleKey } from '../../domain';
import { LoadingIndicator, EmptyIndicator } from '../components';
import type { LifecycleAdapterProps } from '../types';
export default function Adapter({ rows, loading, selected, onSelected }: LifecycleAdapterProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Table.Root style={{ width: 720 }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader scope="col" width={200}>
              Select
            </Table.ColumnHeader>
            <Table.ColumnHeader scope="col" width={320}>
              Entry
            </Table.ColumnHeader>
            <Table.ColumnHeader scope="col" width={200}>
              Amount
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <Checkbox.Root
                  checked={selected.includes(row.id)}
                  onCheckedChange={event =>
                    onSelected(toggleKey(selected, row.id, event.checked === true))
                  }
                >
                  <Checkbox.HiddenInput aria-label={selectionName(row)} />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>{selectionName(row)}</Checkbox.Label>
                </Checkbox.Root>
              </Table.Cell>
              <Table.Cell>
                <RowIdentity row={row} />
              </Table.Cell>
              <Table.Cell>{row.amount}</Table.Cell>
            </Table.Row>
          ))}
          {!rows.length && (
            <Table.Row>
              <Table.Cell colSpan={3}>
                {loading ? <LoadingIndicator /> : <EmptyIndicator />}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </ChakraProvider>
  );
}
