<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const rowKey = 'id';
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
  <Cell {...props}>
    <IconButton
      size="xs"
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        <Icon
          icon={
            expandedRowKeys.some(key => key === rowData[rowKey])
              ? 'minus-square-o'
              : 'plus-square-o'
          }
        />
      }
    />
  </Cell>
);

class ExpandedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fakeData,
      expandedRowKeys: []
    };
    this.handleExpanded = this.handleExpanded.bind(this);
  }
  handleExpanded(rowData, dataKey) {
    const { expandedRowKeys } = this.state;

    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach(key => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }
    this.setState({
      expandedRowKeys: nextExpandedRowKeys
    });
  }
  render() {
    const { expandedRowKeys, data } = this.state;
    return (
      <Table
        height={400}
        data={data}
        rowKey={rowKey}
        expandedRowKeys={expandedRowKeys}
        onRowClick={data => {
          console.log(data);
        }}
        renderRowExpanded={rowData => {
          return (
            <div>
              <div
                style={{
                  width: 60,
                  height: 60,
                  float: 'left',
                  marginRight: 10,
                  background: '#eee'
                }}
              >
                <img src={rowData.avartar} style={{ width: 60 }} />
              </div>
              <p>{rowData.email}</p>
              <p>{rowData.date}</p>
            </div>
          );
        }}
      >
        <Column width={70} align="center">
          <HeaderCell>#</HeaderCell>
          <ExpandCell
            dataKey="id"
            expandedRowKeys={expandedRowKeys}
            onChange={this.handleExpanded}
          />
        </Column>

        <Column width={130}>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={130}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={200}>
          <HeaderCell>City</HeaderCell>
          <Cell dataKey="city" />
        </Column>

        <Column width={200}>
          <HeaderCell>Street</HeaderCell>
          <Cell dataKey="street" />
        </Column>

        <Column width={200}>
          <HeaderCell>Company Name</HeaderCell>
          <Cell dataKey="companyName" />
        </Column>
      </Table>
    );
  }
}
ReactDOM.render(<ExpandedTable />);
```

<!--end-code-->

To implement a Table that can be expanded, a combination of the following attributes is required.

**Step 1: Set properties for Table**

- renderRowExpanded(rowData) => React.Node: Used to return content that needs to be rendered in the expansion panel
- rowExpandedHeight: Sets the height of the expandable area. The default is 100
- expandedRowKeys (controlled) and defaultExpandedRowKeys are used to configure the rows that need to be expanded. Note that the parameters that these two properties receive are an array of Rowkey in the array.。
- rowKey: Give each row of data to a unique key, corresponding to a unique value in the key.

**Step 2：Custom Cell**

Customize a Cell and put a button inside to manipulate the value in expandedRowKeys.
