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

In some cases, you need to merge the relationships between columns to organize your data, and you can set a `ColSpan` attribute on the `<Column>` component, for example:

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

When `lastName` corresponds to a column value of `null` or `undefined`, it is merged by the `firstName` column.
Note that if you want to merge column headers （`HeaderCell`）, do not set `children` in the merged column headers.

Customize Less :

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
