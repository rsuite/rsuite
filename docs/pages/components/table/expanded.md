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

要实现一个可以展开的 Table ,需要以下几个属性的组合完成。

**第一步：给 Table 设置属性**

- renderRowExpanded(rowData) => React.Node 用来返回需要在展开面板中渲染的内容
- rowExpandedHeight 设置可展开区域的高度， 默认是 100
- expandedRowKeys（受控） 和 defaultExpandedRowKeys 用来配置需要展开的行。需要注意的是这两个属性接收的参数是一个的数组，数组中是 rowKey。
- rowKey 给每一行数据对一个唯一 key , 对应 data 中的一个唯一值的 key。

**第二步：自定义 Cell**

自定义一个 Cell， 在内部放一个可以操作按钮，用于操作 expandedRowKeys 中的值。
