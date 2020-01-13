### 虚拟化的大表格

支持 `virtualized`, 有效地呈现大表格数据。

<!--start-code-->

```js
class LargeTable extends React.Component {
  render() {
    return (
      <div>
        <Table
          virtualized
          height={400}
          data={fakeLargeData}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
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
      </div>
    );
  }
}
ReactDOM.render(<LargeTable />);
```

<!--end-code-->
