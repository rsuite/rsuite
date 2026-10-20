import { useState } from 'react';
import { ChakraProvider, defaultSystem, Table, Checkbox } from '@chakra-ui/react';
import { RowIdentity, selectionName } from '../../components';
import { toggleKey } from '../../domain';
import { visibleTree } from '../domain';
import type { TreeAdapterProps } from '../types';
export default function Adapter({ rows, selected, onSelected }: TreeAdapterProps) {
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <ChakraProvider value={defaultSystem}>
      <Table.Root role="treegrid" aria-label="Tree entries" size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader scope="col">Entry</Table.ColumnHeader>
            <Table.ColumnHeader scope="col">Select</Table.ColumnHeader>
            <Table.ColumnHeader scope="col">Amount</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {visibleTree(rows, expanded).map(({ row, level, position, siblings }) => (
            <Table.Row
              key={row.id}
              aria-level={level}
              aria-posinset={position}
              aria-setsize={siblings}
              aria-expanded={row.children ? expanded.includes(row.id) : undefined}
            >
              <Table.Cell style={{ paddingInlineStart: (level - 1) * 24 + 8 }}>
                {row.children && (
                  <button
                    type="button"
                    aria-label={(expanded.includes(row.id) ? 'Collapse ' : 'Expand ') + row.name}
                    aria-expanded={expanded.includes(row.id)}
                    onClick={() =>
                      setExpanded(keys => toggleKey(keys, row.id, !keys.includes(row.id)))
                    }
                  >
                    ▸
                  </button>
                )}
                <RowIdentity row={row} />
              </Table.Cell>
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
              <Table.Cell>{row.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </ChakraProvider>
  );
}
