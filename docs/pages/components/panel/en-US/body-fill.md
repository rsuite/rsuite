### Fill the container

<!--start-code-->

```js
const instance = (
  <Panel header="User List" bordered bodyFill>
    <Table height={400} data={tableData}>
      <Column width={70} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={200} fixed>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={200}>
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

      <Column width={300}>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>

      <Column width={300}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
    </Table>
  </Panel>
);
ReactDOM.render(instance);
```

<!--end-code-->
