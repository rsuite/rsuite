<!--start-code-->

```js
/**
 * import fakeTreeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/tree-data.json
 */

class TreeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fakeTreeData
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Table
          isTree
          defaultExpandAllRows
          rowKey="id"
          height={400}
          data={data}
          onExpandChange={(isOpen, rowData) => {
            console.log(isOpen, rowData);
          }}
          renderTreeToggle={(icon, rowData) => {
            if (rowData.children && rowData.children.length === 0) {
              return <Icon icon="spinner" spin />;
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
      </div>
    );
  }
}

ReactDOM.render(<TreeTable />);
```

<!--end-code-->

A tree table, primarily to show structured data, requires a `isTree` attribute to be set on the `Table` component, while the `data` is used to define the relational structure through `children`.

```js
const data = [
  {
    id: '1',
    labelName: 'Car',
    status: 'ENABLED',
    children: [
      {
        id: '1-1',
        labelName: 'Mercedes Benz',
        status: 'ENABLED',
        count: 460
      }
    ]
  }
];
<Table data={data} isTree rowKey="id" />;
```

**Dealing with related properties for a tree table**

- defaultExpandAllRows:boolean :Expand all nodes By default
- expandedRowKeys (controlled) and defaultExpandedRowKeys are used to configure the rows that need to be expanded. Note that the parameters that these two properties receive are an array of Rowkey in the array.。
- rowKey : Give each row of data to a unique key, corresponding to a unique value in the key. (You can set the rowKey in `<Table>`, the default value is 'key')
- renderTreeToggle:() => React.Node : Custom Toggle
- onExpandChange:(expanded:boolean,rowData:object) => void: To open/close a node's callback function
