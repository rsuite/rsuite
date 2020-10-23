<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const App = () => {
  const data = fakeData.filter((v, i) => i < 8);
  return (
    <Table
      height={420}
      data={data}
      onSortColumn={(sortColumn, sortType) => {
        console.log(sortColumn, sortType);
      }}
    >
      <Column width={50} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={100} fixed>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>
          City <code>flexGrow={1}</code>
        </HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>
          Company Name <code>flexGrow={2}</code>
        </HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
