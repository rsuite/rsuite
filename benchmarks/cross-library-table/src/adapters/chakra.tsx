import { ChakraProvider, defaultSystem, Table, Checkbox } from '@chakra-ui/react';
import { RowIdentity, selectionName } from '../components';
import { ordered, toggleKey } from '../domain';
import type { AdapterProps } from '../types';
export default function Adapter({ rows, sort, onSort, selected, onSelected }: AdapterProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader scope="col">Select</Table.ColumnHeader>
            <Table.ColumnHeader scope="col">Entry</Table.ColumnHeader>
            <Table.ColumnHeader scope="col" aria-sort={sort?.direction ?? 'none'}>
              <button
                type="button"
                onClick={() =>
                  onSort({
                    direction: sort?.direction === 'ascending' ? 'descending' : 'ascending'
                  })
                }
              >
                Amount
              </button>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ordered(rows, sort).map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <Checkbox.Root
                  disabled={row.disabled}
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
        </Table.Body>
      </Table.Root>
    </ChakraProvider>
  );
}
