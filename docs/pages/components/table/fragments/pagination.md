<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [displayLength, setDisplayLength] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLength = dataKey => {
    setPage(1);
    setDisplayLength(dataKey);
  };

  const data = fakeData.filter((v, i) => {
    const start = displayLength * (page - 1);
    const end = start + displayLength;
    return i >= start && i < end;
  });

  return (
    <div>
      <Table height={420} data={data} loading={loading}>
        <Column width={50} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={100} fixed>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={100}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={200}>
          <HeaderCell>City</HeaderCell>
          <Cell dataKey="city" />
        </Column>
        <Column width={200} flexGrow={1}>
          <HeaderCell>Company Name</HeaderCell>
          <Cell dataKey="companyName" />
        </Column>
      </Table>

      <Table.Pagination
        lengthMenu={[
          {
            value: 10,
            label: 10
          },
          {
            value: 20,
            label: 20
          }
        ]}
        activePage={page}
        displayLength={displayLength}
        total={fakeData.length}
        onChangePage={setPage}
        onChangeLength={handleChangeLength}
      />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
