<!--start-code-->

```js
/**
 * import fakeTreeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/tree-data.json
 */

const App = () => {
  return (
    <Table
      isTree
      defaultExpandAllRows
      bordered
      cellBordered
      rowKey="id"
      height={400}
      data={fakeTreeData}
      onExpandChange={(isOpen, rowData) => {
        console.log(isOpen, rowData);
      }}
      renderTreeToggle={(icon, rowData) => {
        if (rowData.children && rowData.children.length === 0) {
          return <Spinner spin />;
        }
        return icon;
      }}
    >
      <Column flexGrow={1}>
        <HeaderCell>Label</HeaderCell>
        <Cell dataKey="labelName" />
      </Column>

      <Column width={100}>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="status" />
      </Column>

      <Column width={100}>
        <HeaderCell>Count</HeaderCell>
        <Cell dataKey="count" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
