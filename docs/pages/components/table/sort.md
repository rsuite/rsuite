<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

class SortTable extends React.Component {
  constructor(props) {
    super(props);
    const data = fakeData.filter((v, i) => i < 8);
    this.state = {
      addColumn: false,
      data
    };
    this.handleSortColumn = this.handleSortColumn.bind(this);
  }

  getData() {
    const { data, sortColumn, sortType } = this.state;

    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  }

  handleSortColumn(sortColumn, sortType) {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        sortColumn,
        sortType,
        loading: false
      });
    }, 500);
  }

  render() {
    return (
      <div>
        <Table
          height={420}
          data={this.getData()}
          sortColumn={this.state.sortColumn}
          sortType={this.state.sortType}
          onSortColumn={this.handleSortColumn}
          loading={this.state.loading}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={70} align="center" fixed sortable>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={130} fixed sortable>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column width={130} sortable>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column width={200} sortable>
            <HeaderCell>City</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column width={200}>
            <HeaderCell>Company Name</HeaderCell>
            <Cell dataKey="companyName" />
          </Column>
        </Table>
      </div>
    );
  }
}

ReactDOM.render(<SortTable />);
```

<!--end-code-->

在需要排序的列 `<Column>` 设置一个 `sortable` 属性。同时在 `<Table>` 定义一个 `onSortColumn` 回调函数，点击列头排序图标的时候，会触发该方法，并返回 `sortColumn` 和 `sortType`。

```html
<Table
  onSortColumn={(sortColumn, sortType)=>{
    console.log(sortColumn, sortType);
  }}
  >

  <Column width={50}  sortable>
      <HeaderCell>Id</HeaderCell>
      <Cell dataKey="id" />
  </Column>

  <Column width={130} sortable >
      <HeaderCell>First Name</HeaderCell>
      <Cell dataKey="firstName" />
  </Column>

...
```
