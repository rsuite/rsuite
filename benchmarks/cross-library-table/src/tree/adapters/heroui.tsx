import { Table, Checkbox, Button } from '@heroui/react';
import { RowIdentity, selectionName } from '../../components';
import type { TreeAdapterProps, TreeRow } from '../types';
import { allTreeKeys } from '../domain';
import '../../heroui.css';
export default function Adapter({ rows, selected, onSelected }: TreeAdapterProps) {
  function renderRow(row: TreeRow) {
    return (
      <Table.Row id={row.id} textValue={row.name}>
        <Table.Cell>
          {row.children && (
            <Button
              slot="chevron"
              aria-label={'Toggle ' + row.name}
              size="sm"
              variant="ghost"
              isIconOnly
            >
              ▸
            </Button>
          )}
          <RowIdentity row={row} />
        </Table.Cell>
        <Table.Cell>
          <Checkbox slot="selection">
            <Checkbox.Content aria-label={selectionName(row)}>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </Checkbox.Content>
          </Checkbox>
        </Table.Cell>
        <Table.Cell>{row.amount}</Table.Cell>
        {row.children && <Table.Collection items={row.children}>{renderRow}</Table.Collection>}
      </Table.Row>
    );
  }
  return (
    <Table>
      <Table.Content
        aria-label="Tree entries"
        treeColumn="entry"
        defaultExpandedKeys={[]}
        selectionMode="multiple"
        selectedKeys={new Set(selected)}
        onSelectionChange={keys =>
          onSelected(keys === 'all' ? allTreeKeys(rows) : [...keys].map(String))
        }
      >
        <Table.Header>
          <Table.Column id="entry" isRowHeader>
            Entry
          </Table.Column>
          <Table.Column id="selection">Select</Table.Column>
          <Table.Column id="amount">Amount</Table.Column>
        </Table.Header>
        <Table.Body items={rows} dependencies={[selected]}>
          {renderRow}
        </Table.Body>
      </Table.Content>
    </Table>
  );
}
