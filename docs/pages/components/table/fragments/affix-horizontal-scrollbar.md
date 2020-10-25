<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const App = () => {
  const data = fakeData.filter((v, i) => i < 10);
  return (
    <Table
      height={420}
      data={data}
      bordered
      cellBordered
      autoHeight
      affixHeader
      affixHorizontalScrollbar
    >
      <Column width={50} align="center" fixed resizable>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={100} fixed resizable>
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
      <Column width={200} resizable>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
      <Column width={200} resizable>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
      <Column width={200} resizable>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
      <Column width={200} resizable>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
      <Column width={200} resizable>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
      <Column width={200} resizable>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
    </Table>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
