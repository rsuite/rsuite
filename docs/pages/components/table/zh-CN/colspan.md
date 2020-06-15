<!--start-code-->

```js
/**
 * import fakeDataForColSpan from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-colspan.json
 */

class ColspanTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fakeDataForColSpan
    };
  }
  render() {
    return (
      <div>
        <Table
          bordered
          cellBordered
          height={420}
          headerHeight={80}
          data={this.state.data}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={70} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <ColumnGroup header="Name">
            <Column width={130} colSpan={2}>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>

            <Column width={130}>
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>
          </ColumnGroup>

          <Column width={200} colSpan={2}>
            <HeaderCell>Address</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column width={200} flexGrow={1}>
            <HeaderCell>Company Name</HeaderCell>
            <Cell dataKey="companyName" />
          </Column>
        </Table>
      </div>
    );
  }
}

ReactDOM.render(<ColspanTable />);
```

<!--end-code-->

在某些情况下，需要合并列来组织数据之间的关系，可以在 `<Column>` 组件上设置一个 `colSpan` 属性，同时通过 `<ColumnGroup>` 设置表头分组。
例如：

```js
<ColumnGroup header="Name">
  <Column width={130} colSpan={2}>
    <HeaderCell>First Name</HeaderCell>
    <Cell dataKey="firstName" />
  </Column>

  <Column width={130}>
    <HeaderCell>Last Name</HeaderCell>
    <Cell dataKey="lastName" />
  </Column>
</ColumnGroup>
```

> 当 `lastName` 对应列的值为 `null` 或者 `undefined` 的时候，则会被 `firstName` 列合并。
