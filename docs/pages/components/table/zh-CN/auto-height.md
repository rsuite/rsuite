<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

function AutoHeigthTable() {
  return (
    <Table height={420} data={fakeData} autoHeight>
      <Column width={50} align="center" resizable>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={100} resizable>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={100} resizable>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200} resizable>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200} resizable>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
    </Table>
  );
}
ReactDOM.render(<AutoHeigthTable />);
```

<!--end-code-->
