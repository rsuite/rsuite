import { useRef, useImperativeHandle } from 'react';
import { Table, Checkbox } from '@heroui/react';
import { Virtualizer, TableLayout } from 'react-aria-components/Virtualizer';
import type { TableState } from 'react-aria-components/Table';
import ReactAriaFocusRegistration from '../components/ReactAriaFocusRegistration';
import { RowIdentity, selectionName } from '../../components';
import type { VirtualAdapterProps } from '../types';
import { ROW_HEIGHT, BODY_HEIGHT, HEADER_HEIGHT } from '../domain';
import '../../heroui.css';
export default function Adapter({ rows, selected, onSelected, actionsRef }: VirtualAdapterProps) {
  const ref = useRef<HTMLTableElement>(null);
  const stateRef = useRef<TableState<unknown>>(null);
  useImperativeHandle(actionsRef, () => ({
    jumpToIndex: index => {
      const key = rows[index]?.id;
      if (key) stateRef.current?.selectionManager.setFocusedKey(key);
      ref.current?.scrollTo({ top: index * ROW_HEIGHT });
    }
  }));
  return (
    <Table style={{ width: 720 }}>
      <Virtualizer
        layout={TableLayout}
        layoutOptions={{ rowHeight: ROW_HEIGHT, headingHeight: HEADER_HEIGHT }}
      >
        <Table.Content
          ref={ref}
          data-virtual-viewport
          aria-label="Virtual ledger entries"
          selectionMode="multiple"
          selectedKeys={new Set(selected)}
          onSelectionChange={keys =>
            onSelected(keys === 'all' ? rows.map(row => row.id) : [...keys].map(String))
          }
          style={{
            width: 720,
            height: BODY_HEIGHT + HEADER_HEIGHT,
            overflow: 'auto',
            scrollPaddingTop: HEADER_HEIGHT
          }}
        >
          <Table.Header style={{ background: 'white', width: '100%', height: '100%' }}>
            <Table.Column id="selection">Select</Table.Column>
            <Table.Column id="name" isRowHeader>
              <ReactAriaFocusRegistration stateRef={stateRef} />
              Name
            </Table.Column>
            <Table.Column id="amount">Amount</Table.Column>
          </Table.Header>
          <Table.Body items={rows}>
            {row => (
              <Table.Row id={row.id} style={{ width: 'inherit', height: 'inherit' }}>
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
      </Virtualizer>
    </Table>
  );
}
