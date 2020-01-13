<!--start-code-->

```js
/**
 * import fakeDataForColSpan from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/pages/components/table/data/usersForColSpan.js
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
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={130} fixed colSpan={2}>
            <HeaderCell className="header-cell-group">
              <div className="header-cell-group-title">Name</div>
              <div className="header-cell-group-subtitle">
                <span style={{ width: 130 }}>First Name</span>
                <span style={{ width: 130 }}>Last Name</span>
              </div>
            </HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column width={130} fixed>
            <HeaderCell />
            <Cell dataKey="lastName" />
          </Column>

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

在某些情况下，需要合并列来组织数据之间的关系，可以在 `<Column>` 组件上设置一个 `colSpan` 属性，例如：

```html
<Column width={130} colSpan={2} >
  <HeaderCell>Name</HeaderCell>
  <Cell dataKey="firstName" />
</Column>

<Column width={130}  >
  <HeaderCell />
  <Cell dataKey="lastName" />
</Column>
```

当 `lastName` 对应列的值为 `null` 或者 `undefined` 的时候，则会被 `firstName` 列合并。注意，如果想要合并列头（`HeaderCell`）, 在被合并的列头不要设置 `children`。


自定义 Less :

```less
.rs-table {
  .header-cell-group {
    .rs-table-cell-content {
      padding: 0;
    }
    &-title,
    &-subtitle span {
      padding: 10px;
      border-bottom: 1px solid #f2f2f5;
    }
    &-subtitle span {
      display: inline-block;
      border-right: 1px solid #f2f2f5;
    }
  }
}
```