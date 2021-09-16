<!--start-code-->

```js
/**
 * import fakeMergeCellsData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-merge-cells.json
 */

const App = () => {
  return (
    <Table bordered cellBordered autoHeight data={fakeMergeCellsData} hover={false}>
      <Column
        width={200}
        verticalAlign="middle"
        rowSpan={rowData => {
          return rowData.cityRowSpan;
        }}
      >
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column
        width={200}
        verticalAlign="middle"
        rowSpan={rowData => {
          return rowData.streetRowSpan;
        }}
      >
        <HeaderCell>Street</HeaderCell>
        <Cell dataKey="street" />
      </Column>

      <Column width={130}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={130}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200} flexGrow={1}>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
