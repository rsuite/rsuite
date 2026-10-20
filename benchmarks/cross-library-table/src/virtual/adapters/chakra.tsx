import { useRef, useCallback, useImperativeHandle } from 'react';
import { useVirtualCheckboxFocus } from '../hooks/useVirtualCheckboxFocus';
import { ChakraProvider, defaultSystem, Table, Checkbox } from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { RowIdentity, selectionName } from '../../components';
import { toggleKey } from '../../domain';
import type { VirtualAdapterProps } from '../types';
import { ROW_HEIGHT, BODY_HEIGHT, HEADER_HEIGHT } from '../domain';
export default function Adapter({ rows, selected, onSelected, actionsRef }: VirtualAdapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const virtual = useVirtualizer({
    count: rows.length,
    getScrollElement: () => ref.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
    getItemKey: index => rows[index].id,
    scrollMargin: HEADER_HEIGHT,
    scrollPaddingStart: HEADER_HEIGHT
  });
  const scrollToIndex = useCallback(
    (index: number, align: 'start' | 'auto') => virtual.scrollToIndex(index, { align }),
    [virtual]
  );
  const focus = useVirtualCheckboxFocus(rows, scrollToIndex);
  useImperativeHandle(actionsRef, () => ({ jumpToIndex: focus.jumpToIndex }), [focus.jumpToIndex]);
  return (
    <ChakraProvider value={defaultSystem}>
      <div ref={focus.viewportRef}>
        <div
          ref={ref}
          data-virtual-viewport
          style={{ height: BODY_HEIGHT + HEADER_HEIGHT, width: 720, overflow: 'auto' }}
        >
          <Table.Root size="sm" style={{ width: 720, tableLayout: 'fixed' }}>
            <Table.Header
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
                height: HEADER_HEIGHT,
                background: 'white'
              }}
            >
              <Table.Row>
                <Table.ColumnHeader scope="col" width={200}>
                  Select
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" width={320}>
                  Name
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" width={200}>
                  Amount
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body
              style={{ height: virtual.getTotalSize(), position: 'relative', display: 'block' }}
            >
              {virtual.getVirtualItems().map(item => {
                const row = rows[item.index];
                return (
                  <Table.Row
                    key={row.id}
                    data-virtual-row-id={row.id}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 720,
                      height: ROW_HEIGHT,
                      display: 'table',
                      tableLayout: 'fixed',
                      transform: 'translateY(' + (item.start - HEADER_HEIGHT) + 'px)'
                    }}
                  >
                    <Table.Cell width={200}>
                      <Checkbox.Root
                        checked={selected.includes(row.id)}
                        onCheckedChange={event =>
                          onSelected(toggleKey(selected, row.id, event.checked === true))
                        }
                      >
                        <Checkbox.HiddenInput
                          aria-label={selectionName(row)}
                          {...focus.getInputProps(row)}
                        />
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label>{selectionName(row)}</Checkbox.Label>
                      </Checkbox.Root>
                    </Table.Cell>
                    <Table.Cell width={320}>
                      <RowIdentity row={row} />
                    </Table.Cell>
                    <Table.Cell width={200}>{row.amount}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </ChakraProvider>
  );
}
